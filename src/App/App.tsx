import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';

import { HomePage } from '../_features/HomePage';
import { LoginPage } from '../_features/LoginPage';
import { RegisterPage } from '../_features/RegisterPage';
import { ScorerPage } from '../_features/ScorerPage';
import { SettingsPage } from '../_features/SettingsPage';
import { EventPage } from '../_features/EventPage';

export function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <Container fluid>
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
        </Container>
    );
}
