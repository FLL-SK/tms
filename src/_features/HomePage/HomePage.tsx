import React, { useEffect } from 'react';
import { Col, Row, Spinner, TabContainer } from 'react-bootstrap';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions/user.actions';

import { RootState } from '../../_reducers';

import NotLoggedIn from '../../_components/NotLoggedIn';
import EventCard from '../../_components/EventCard';

import { Navigation } from './_nav';

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

    const onSelect = () => {};

    return (
        <>
            <Col lg={{ span: 6, offset: 3 }}>
                <Navigation onSelect={onSelect} />
                  <h1>Profile</h1>

                {userState.loading && <Spinner animation="grow" size="sm" />}
                {user && (
                    <>
                        <FormGroup as={Row}>
                            <FormLabel column sm={4}>
                                Username
                            </FormLabel>
                            <Col>
                                <FormControl readOnly defaultValue={user.username} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <FormLabel column sm={4}>
                                Full Name
                            </FormLabel>
                            <Col>
                                <FormControl readOnly defaultValue={user.fullName} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <FormLabel column sm={4}>
                                DPA Accepted On
                            </FormLabel>
                            <Col>
                                <FormControl readOnly defaultValue={user.dpaAccepted?.toLocaleDateString()} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <FormLabel column sm={4}>
                                E-mail
                            </FormLabel>
                            <Col>
                                <FormControl readOnly defaultValue={user.email} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <FormLabel column sm={4}>
                                Phone
                            </FormLabel>
                            <Col>
                                <FormControl readOnly defaultValue={user.phone} />
                            </Col>
                        </FormGroup>
                    </>
                )}

                {userState.manager && userState.manager.loading && <Spinner animation="grow" size="sm" />}
                {userState.manager && userState.manager.events && (
                    <>
                        <h2 key={1}>My Tournaments</h2>

                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
