import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Jumbotron, Container, Row, Col, Alert } from 'react-bootstrap';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { RGScorerPage } from '../RGScorerPage';

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
                <Col lg={{ span: 8, offset: 2 }} sm>
                    <Alert variant={alert.type} show={alert.message != null}>
                        <p>{alert.message}</p>
                    </Alert>
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/scorer" component={RGScorerPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </Col>
            </Row>
        </Container>
    );
}

export { App };
