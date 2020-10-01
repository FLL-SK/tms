import React, { useEffect } from 'react';
import { Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions/user.actions';

import { RootState } from '../../_reducers';

import { NotLoggedIn } from '../../_components/NotLoggedIn';

const EventCard = ({ name, date, id, ...props }) => {
    return (
        <Card
            className="fll-bg-secondary"
            style={{ width: '25rem', height: '8rem', marginRight: '1rem', marginBottom: '1rem', padding: '1rem' }}
            {...props}
        >
            <Card.Title>{name}</Card.Title>
            <label>
                Date <input readOnly defaultValue={date} />
            </label>
            <Card.Link href={'/event/' + id}>Open</Card.Link>
        </Card>
    );
};

export function HomePage() {
    const userState = useSelector((state: RootState) => state.user);
    const user = useSelector((state: RootState) => state.user.user);
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    if (!auth.loggedIn) return NotLoggedIn();

    useEffect(() => {
        if (auth.user) {
            dispatch(userActions.getById(auth.user._id));
            dispatch(userActions.getManagerEvents(auth.user._id));
            dispatch(userActions.getJudgeEvents(auth.user._id));
            dispatch(userActions.getRefereeEvents(auth.user._id));
        }
    }, []);

    return (
        <>
            <Col lg={{ span: 8, offset: 2 }}>
                <h1>Profile</h1>

                {userState.loading && <Spinner animation="grow" size="sm" />}
                {user && (
                    <>
                        <Card>
                            You're logged in as {user.username} <br />
                            id= {user._id}
                            <br />
                            {user.fullName}
                            <br />
                            {user.dpaAccepted}
                            <br />
                            {user.email}
                            <br />
                            {user.phone}
                        </Card>
                        <Link to="/login">Logout</Link>
                    </>
                )}

                {userState.manager && userState.manager.loading && <Spinner animation="grow" size="sm" />}
                {userState.manager && userState.manager.events && (
                    <>
                        <h2 key={1}>My Tournaments</h2>

                        <div style={{ display: 'flex' }}>
                            {userState.manager.events.map((e) => (
                                <EventCard name={e.name} id={e._id} key={e._id} date={e.startDate} />
                            ))}
                        </div>
                    </>
                )}

                {userState.judge && userState.judge.loading && <Spinner animation="grow" size="sm" />}
                {userState.judge && userState.judge.events && userState.judge.events.length > 0 && (
                    <>
                        <h2>I'm judging</h2>

                        <div style={{ display: 'flex' }}>
                            {userState.judge.events.map((e) => (
                                <EventCard name={e.name} id={e._id} key={e._id} date={e.startDate} />
                            ))}
                        </div>
                    </>
                )}

                {userState.referee && userState.referee.loading && <Spinner animation="grow" size="sm" />}
                {userState.referee && userState.referee.events && userState.referee.events.length > 0 && (
                    <>
                        <h2>I'm referee at</h2>

                        <div style={{ display: 'flex' }}>
                            {userState.referee.events.map((e) => (
                                <EventCard name={e.name} id={e._id} key={e._id} date={e.startDate} />
                            ))}
                        </div>
                    </>
                )}
            </Col>
        </>
    );
}
