import React, { useEffect, useState } from 'react';

import { Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import { TabContainer, TabPane, TabContent } from 'react-bootstrap';

import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { eventActions } from '../../_actions/event.actions';
import { eventTeamActions } from '../../_actions/eventTeam.actions';

import { RootState } from '../../_reducers';

import { NotLoggedIn } from '../../_components/NotLoggedIn';
import { User } from '../../_types/User';

import { ScoringTable } from './_scoring';
import { EventProfile } from './_profile';
import { RG } from './_rg';

import { Navigation } from './_nav';
import { AlertDisplay } from '../../_components/Alert';

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

    function handleRGSubmit(round: string, table: string, teamId: string, totalScore: number, missions: Object) {
        console.log('RG Submit', teamId, totalScore, missions);
        if (event)
            dispatch(
                eventActions.submitGameScore(event._id, teamId, round, table, totalScore, JSON.stringify(missions)),
            );
        setKey('scoreTable');
    }

    useEffect(() => {
        const { id } = props.match.params;
        dispatch(eventActions.getById(id));
        dispatch(eventTeamActions.getTeams(id));
        dispatch(eventActions.getScores(id));
    }, []);

    return (
        <>
            <TabContainer activeKey={key}>
                <Navigation onSelect={(k) => setKey(k || 'details')} />
                <TabContent>
                    <TabPane eventKey="details">
                        <h3>{event ? event.name : ''}</h3>
                        <EventProfile
                            loading={eventState.loading || false}
                            event={event}
                            isAdmin={auth.sysRoles.isAdmin || false}
                            isEventManager={auth.eventRoles.isEventManager || false}
                            onStatusChange={handleStatusChange}
                        />
                    </TabPane>
                    <TabPane eventKey="teams">
                        <h3>Tímy</h3>
                        {eventState.teams.loading && <Spinner animation="grow" size="sm" />}
                        {eventState.teams.list &&
                            eventState.teams.list.map((i) => (
                                <Button type="button" href={'/profile/' + i._id} variant="outline-primary" key={i._id}>
                                    {i.name}
                                </Button>
                            ))}
                    </TabPane>
                    <TabPane eventKey="rgSchedule">
                        <h3>Robot Game Round 1</h3>
                        <RGRound
                            loading={eventState.teams.loading}
                            round={1}
                            schedule={event ? event.rgSchedule : []}
                        />
                        <h3>Robot Game Round 2</h3>
                        <RGRound
                            loading={eventState.teams.loading}
                            round={2}
                            schedule={event ? event.rgSchedule : []}
                        />
                        <h3>Robot Game Round 3</h3>
                        <RGRound
                            loading={eventState.teams.loading}
                            round={3}
                            schedule={event ? event.rgSchedule : []}
                        />
                    </TabPane>
                    <TabPane eventKey="scoreTable">
                        <h3>Scoring Table</h3>
                        <ScoringTable
                            loading={eventState.scores.loading || eventState.teams.loading ? true : false}
                            teams={eventState.teams.list || []}
                            scores={eventState.scores.list || []}
                        />
                    </TabPane>
                    <TabPane eventKey="catGame">
                        <h3>Category: Robot Game</h3>
                        <RG
                            teams={eventState.teams.list || []}
                            tables={[
                                ['A', 'Table A'],
                                ['B', 'Table B'],
                            ]}
                            rounds={[
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
                            ]}
                            onSubmit={handleRGSubmit}
                            program={event?.program}
                        />
                    </TabPane>
                    <TabPane eventKey="catValues">
                        <h3>Category: Core Values</h3>
                    </TabPane>
                    <TabPane eventKey="catProject">
                        <h3>Category: Innovation Project</h3>
                    </TabPane>
                    <TabPane eventKey="catDesign">
                        <h3>Category: Robot Design</h3>
                    </TabPane>
                </TabContent>
            </TabContainer>
        </>
    );
}
