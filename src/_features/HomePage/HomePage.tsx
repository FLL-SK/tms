import React, { useEffect } from 'react';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions/user.actions';

import { RootState } from '../../_reducers';
import { app } from '../../_reducers/app.reducer';
//import { user } from '../../_reducers/user.reducer'

function HomePage() {
    const userState = useSelector((state: RootState) => state.user);
    const user = useSelector((state: RootState) => state.user.user);
    const auth = useSelector((state: RootState) => state.authentication);
    const dispatch = useDispatch();

    if (!auth.loggedIn) return null;

    console.log('HomePage user=', auth.user);

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
                <Card>
                    <Card.Body>
                        <Card.Title>Profil</Card.Title>

                        {user && (
                            <>
                                <Card.Text>
                                    You're logged in as {user.username} id= {user._id}
                                    {user.fullName}
                                    {user.dpaAccepted}
                                    {user.email}
                                    {user.phone}
                                </Card.Text>
                                <Link to="/login">Logout</Link>
                            </>
                        )}
                    </Card.Body>
                </Card>

                {userState.manager && userState.manager.events && (
                    <Card>
                        <Card.Body>
                            <Card.Title>Organizujem turnaje</Card.Title>

                            <ListGroup>
                                {userState.manager.events.map((e) => (
                                    <ListGroup.Item action href={'/event/' + e._id} key={e._id}>
                                        {e.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                )}
            </Col>
        </>
    );
}

export { HomePage };
