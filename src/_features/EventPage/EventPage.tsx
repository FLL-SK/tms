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
                        </Card.Body>
                    )}
                </Card>
            </Col>
        </>
    );
}

export { EventPage };
