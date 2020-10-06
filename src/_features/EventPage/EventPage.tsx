import React, { useEffect, useState } from 'react';

import { Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import { TabContainer, TabPane, TabContent } from 'react-bootstrap';

import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { eventActions } from '../../_actions/event.actions';
import { eventTeamActions } from '../../_actions/eventTeam.actions';

import { RootState } from '../../_reducers';

import NotLoggedIn from '../../_components/NotLoggedIn';
import { User } from '../../_types/User';

import { ScoringTable } from './_scoring';
import { EventProfile } from './_profile';
import { RG } from './_rg';
import { Judging } from './_judge';

import { Navigation } from './_nav';
import AlertDisplay from '../../_components/Alert';
import { GameRound, JudgingCategory } from '../../_types';
import TeamCard from '../../_components/TeamCard';

interface IParams {
    id: string;
}

function TeamBtn({ id, name }) {
    return (
        <>
            <Button type="button" href={'/profile/' + id} variant="outline-primary" block>
                {name}
            </Button>
        </>
    );
}

function RGRound({ loading, round, schedule }) {
    return (
        <>
            {loading && <Spinner animation="grow" size="sm" />}
            {!loading && (
                <Row>
                    <Col>
                        {schedule.map((i) =>
                            i.round == round ? <TeamBtn id={i.t1._id} name={i.t1.name} key={i.t1._id} /> : '',
                        )}
                    </Col>
                    <Col>
                        {schedule.map((i) =>
                            i.round == round ? <TeamBtn id={i.t2._id} name={i.t2.name} key={i.t2._id} /> : '',
                        )}
                    </Col>
                </Row>
            )}
        </>
    );
}

const tables: [string, string][] = [
    ['A', 'Table A'],
    ['B', 'Table B'],
];

const rounds: [GameRound, string][] = [
    ['1', 'Round 1'],
    ['2', 'Round 2'],
    ['3', 'Round 3'],
    ['PO', 'Play-off'],
    ['Q', 'Quarter-finals'],
    ['Q-PO', 'Quarter PlayOff'],
    ['S', 'Semi-finals'],
    ['Q-PO', 'Semi PlayOff'],
    ['F', 'Finals'],
    ['F-PO', 'Finals PlayOff'],
];

export function EventPage(props: RouteComponentProps<IParams>) {
    const eventState = useSelector((state: RootState) => state.event);
    const event = useSelector((state: RootState) => state.event.event);
    const auth = useSelector((state: RootState) => state.auth);
    const alert = useSelector((state: RootState) => state.alert);
    const dispatch = useDispatch();
    const [key, setKey] = useState('details');

    console.log('EventPage event=', event);

    if (!auth.user) return NotLoggedIn();

    function handleStatusChange(newStatus: number) {
        if (!event) return;
        dispatch(eventActions.setFields(event._id, { status: newStatus }));
    }

    function handleRGSubmit(round: GameRound, table: string, teamId: string, totalScore: number, missions: Object) {
        console.log('RG Submit', teamId, totalScore, missions);
        if (event)
            dispatch(
                eventActions.submitGameScore(event._id, teamId, round, table, totalScore, JSON.stringify(missions)),
            );
        setKey('scoreTable');
    }

    function handleJudgeSubmit(teamId: string, type: JudgingCategory, totalScore: number, data: Object) {
        console.log('Judge Submit', type, teamId, totalScore, data);
        if (event)
            dispatch(
                eventActions.submitJudgingScore(event._id, teamId, type, 'room', totalScore, JSON.stringify(data)),
            );
    }

    useEffect(() => {
        const { id } = props.match.params;
        dispatch(eventActions.getById(id));
        dispatch(eventTeamActions.getTeams(id));
        dispatch(eventActions.getScores(id));
    }, []);

    return (
        <>
            <Col lg={{ span: 8, offset: 2 }}>
                <TabContainer activeKey={key}>
                    <Navigation onSelect={(k) => setKey(k || 'details')} />
                    <h1>{'Tournament ' + (event ? event.name : '')}</h1>
                    <TabContent>
                        <TabPane eventKey="details">
                            <EventProfile
                                loading={eventState.loading || false}
                                event={event}
                                isAdmin={auth.sysRoles.isAdmin || false}
                                isEventManager={auth.eventRoles.isEventManager || false}
                                onStatusChange={handleStatusChange}
                            />
                        </TabPane>
                        <TabPane eventKey="teams">
                            <h2>Tímy</h2>
                            {eventState.teams.loading && <Spinner animation="grow" size="sm" />}
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {eventState.teams.list &&
                                    eventState.teams.list.map((i) => <TeamCard id={i._id} name={i.name} key={i._id} />)}
                            </div>
                        </TabPane>
                        <TabPane eventKey="rgSchedule">
                            <h2>Robot Game Round 1</h2>
                            <RGRound
                                loading={eventState.teams.loading}
                                round={1}
                                schedule={event ? event.rgSchedule : []}
                            />
                            <h2>Robot Game Round 2</h2>
                            <RGRound
                                loading={eventState.teams.loading}
                                round={2}
                                schedule={event ? event.rgSchedule : []}
                            />
                            <h2>Robot Game Round 3</h2>
                            <RGRound
                                loading={eventState.teams.loading}
                                round={3}
                                schedule={event ? event.rgSchedule : []}
                            />
                        </TabPane>
                        <TabPane eventKey="scoreTable">
                            <h2>Scoring Table</h2>
                            <ScoringTable
                                loading={eventState.scores.loading || eventState.teams.loading ? true : false}
                                teams={eventState.teams.list || []}
                                scores={eventState.scores.list || []}
                            />
                        </TabPane>
                        <TabPane eventKey="catGame">
                            <h2>Category: Robot Game</h2>
                            <RG
                                teams={eventState.teams.list || []}
                                tables={tables}
                                rounds={rounds}
                                onSubmit={handleRGSubmit}
                                program={event?.program}
                            />
                        </TabPane>
                        <TabPane eventKey="catValues">
                            <h2>Category: Core Values</h2>
                            <Judging
                                category="coreValues"
                                teams={eventState.teams.list || []}
                                scores={eventState.scores.list || []}
                                onSubmit={handleJudgeSubmit}
                            />
                        </TabPane>
                        <TabPane eventKey="catProject">
                            <h2>Category: Innovation Project</h2>
                            <Judging
                                category="project"
                                teams={eventState.teams.list || []}
                                scores={eventState.scores.list || []}
                                onSubmit={handleJudgeSubmit}
                            />
                        </TabPane>
                        <TabPane eventKey="catDesign">
                            <h2>Category: Robot Design</h2>
                            <Judging
                                category="design"
                                teams={eventState.teams.list || []}
                                scores={eventState.scores.list || []}
                                onSubmit={handleJudgeSubmit}
                            />
                        </TabPane>
                    </TabContent>
                </TabContainer>
            </Col>
        </>
    );
}
