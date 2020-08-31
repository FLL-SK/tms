import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { txt } from '../_locales';

import { userActions } from '../_actions';

import { RootState } from '../_reducers';

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector((state: RootState) => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    return (
        <Row>
            <Col md={{ span: 8, offset: 2 }} sm>
                <h2>{t(txt.LoginPage.title)}</h2>
                <Form name="form" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>{t(txt.LoginPage.username)}</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            className={submitted && !username ? ' is-invalid' : ''}
                        />
                        {submitted && !username && (
                            <Form.Control.Feedback type="invalid">
                                {t(txt.LoginPage.username_required)}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t(txt.LoginPage.password)}</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className={submitted && !password ? ' is-invalid' : ''}
                        />
                        {submitted && !password && (
                            <Form.Control.Feedback type="invalid">
                                {t(txt.LoginPage.password_required)}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Button variant="secondary" type="submit">
                            {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            {t(txt.LoginPage.btnLogin)}
                        </Button>
                        <Link to="/register" className="btn-link">
                            {t(txt.LoginPage.btnRegister)}
                        </Link>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
}

export { LoginPage };
