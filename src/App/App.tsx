import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Jumbotron, Container, Row, Col, Alert } from 'react-bootstrap';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../_features/HomePage';
import { LoginPage } from '../_features/LoginPage';
import { RegisterPage } from '../_features/RegisterPage';
import { Scorer as ScorerPage } from '../_features/ScorerPage';
import { SettingsPage } from '../_features/SettingsPage';
import { EventPage } from '../_features/EventPage';

import { RootState } from '../_reducers';

function App() {
    const alert = useSelector((state: RootState) => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col sm lg={{ span: 10, offset: 1 }}>
                    <Alert variant={alert.type} show={alert.message != null}>
                        <p>{alert.message}</p>
                    </Alert>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/event/:id" component={EventPage} />
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/scorer" component={ScorerPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/settings" component={SettingsPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </Col>
            </Row>
        </Container>
    );
}

export { App };
