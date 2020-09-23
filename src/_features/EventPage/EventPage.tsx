import React, { Props, ReactElement, Component, useEffect, useState } from 'react';
import { Row, Col, Card, ListGroup, Spinner, Button, Form } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { eventActions } from '../../_actions/event.actions';
import { eventTeamActions } from '../../_actions/eventTeam.actions';

import { RootState } from '../../_reducers';

import { NotLoggedIn } from '../../_components/NotLoggedIn';
import { User } from '../../_types/User';

import { RankingTable } from './_ranking';
import { EventProfile } from './_profile';

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
    const dispatch = useDispatch();

    console.log('EventPage event=', event);

    if (!auth.user) return NotLoggedIn();

    function handleStatusChange(newStatus: number) {
        if (!event) return;
        dispatch(eventActions.setFields(event._id, { status: newStatus }));
    }

    useEffect(() => {
        const { id } = props.match.params;
        dispatch(eventActions.getById(id));
        dispatch(eventTeamActions.getTeams(id));
        dispatch(eventActions.getRanking(id));
    }, []);

    return (
        <>
            <Col lg={{ span: 10, offset: 1 }}>
                <Card>
                    <h1>Turnaj</h1>
                    <Card.Title>{event ? event.name : ''}</Card.Title>
                    <Card.Body>
                        <EventProfile
                            loading={eventState.loading || false}
                            event={event}
                            isAdmin={auth.sysRoles.isAdmin || false}
                            isEventManager={auth.eventRoles.isEventManager || false}
                            onStatusChange={handleStatusChange}
                        />
                    </Card.Body>
                </Card>
                <Card>
                    <h3>Tímy</h3>
                    {eventState.teams.loading && <Spinner animation="grow" size="sm" />}
                    {eventState.teams.list &&
                        eventState.teams.list.map((i) => (
                            <Button type="button" href={'/profile/' + i._id} variant="outline-primary" key={i._id}>
                                {i.name}
                            </Button>
                        ))}
                </Card>
                <Card>
                    <h3>Robot Game Round 1</h3>
                    <RGRound loading={eventState.teams.loading} round={1} schedule={event ? event.rgSchedule : []} />
                    <h3>Robot Game Round 2</h3>
                    <RGRound loading={eventState.teams.loading} round={2} schedule={event ? event.rgSchedule : []} />
                    <h3>Robot Game Round 3</h3>
                    <RGRound loading={eventState.teams.loading} round={3} schedule={event ? event.rgSchedule : []} />
                </Card>
                <Card>
                    <h3>Ranking Table</h3>
                    <RankingTable
                        loading={eventState.ranking.loading || eventState.teams.loading ? true : false}
                        teams={eventState.teams.list || []}
                        scores={eventState.ranking.list || []}
                    />
                </Card>
                <Card>
                    <h3>Robot Game</h3>
                </Card>
            </Col>
        </>
    );
}
