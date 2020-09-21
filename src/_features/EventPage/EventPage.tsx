import React, { useEffect } from 'react';
import { Row, Col, Card, ListGroup, Spinner, Button } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { eventActions } from '../../_actions/event.actions';
import { eventTeamActions } from '../../_actions/eventTeam.actions';

import { RootState } from '../../_reducers';

import { NotLoggedIn } from '../../_components/NotLoggedIn';

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

function EventPage(props: RouteComponentProps<IParams>) {
    const eventState = useSelector((state: RootState) => state.event);
    const event = useSelector((state: RootState) => state.event.event);
    const auth = useSelector((state: RootState) => state.authentication);
    const dispatch = useDispatch();

    console.log('EventPage event=', event);

    if (!auth.user) return NotLoggedIn();

    useEffect(() => {
        const { id } = props.match.params;
        dispatch(eventActions.getById(id));
        dispatch(eventTeamActions.getTeams(id));
    }, []);

    return (
        <>
            <Col lg={{ span: 8, offset: 2 }}>
                <Card>
                    <h1>Turnaj</h1>
                    {eventState.loading && <Spinner animation="grow" size="sm" />}
                    {event && (
                        <Card.Body>
                            <Card.Title>Turnaj - {event.name}</Card.Title>
                            <h3>Usporiadatelia</h3>
                            {event.managers.map((i) => (
                                <Button type="button" href={'/profile/' + i._id} variant="outline-primary" key={i._id}>
                                    {i.fullName}
                                </Button>
                            ))}
                            <h3>Porotci</h3>
                            {event.judges.map((i) => (
                                <Button type="button" href={'/profile/' + i._id} variant="outline-primary" key={i._id}>
                                    {i.fullName}
                                </Button>
                            ))}
                            <h3>Rozhodcovia</h3>
                            {event.referees.map((i) => (
                                <Button type="button" href={'/profile/' + i._id} variant="outline-primary" key={i._id}>
                                    {i.fullName}
                                </Button>
                            ))}
                            <h3>Tímy</h3>
                            {eventState.teams.loading && <Spinner animation="grow" size="sm" />}
                            {eventState.teams.list &&
                                eventState.teams.list.map((i) => (
                                    <Button
                                        type="button"
                                        href={'/profile/' + i._id}
                                        variant="outline-primary"
                                        key={i._id}
                                    >
                                        {i.name}
                                    </Button>
                                ))}
                            <h3>Robot Game Round 1</h3>
                            <RGRound loading={eventState.teams.loading} round={1} schedule={event.rgSchedule} />
                            <h3>Robot Game Round 2</h3>
                            <RGRound loading={eventState.teams.loading} round={2} schedule={event.rgSchedule} />
                            <h3>Robot Game Round 3</h3>
                            <RGRound loading={eventState.teams.loading} round={3} schedule={event.rgSchedule} />
                        </Card.Body>
                    )}
                </Card>
            </Col>
        </>
    );
}

export { EventPage };
