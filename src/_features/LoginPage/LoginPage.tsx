import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { txt } from '../../_locales';

import { userActions } from '../../_actions';

import { RootState } from '../../_reducers';

type Inputs = {
    username: string;
    password: string;
};

function LoginPage() {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const [submitted, setSubmitted] = useState(false);
    const loggingIn = useSelector((state: RootState) => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setSubmitted(true);
        if (data.username && data.password) {
            dispatch(userActions.login(data.username, data.password));
        }
    };

    return (
        <Row>
            <Col md={{ span: 8, offset: 2 }} sm>
                <h2>{t(txt.LoginPage.title)}</h2>
                <Form name="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>{t(txt.LoginPage.username)}</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            defaultValue="aa"
                            ref={register({ required: true })}
                            className={submitted && errors.username ? ' is-invalid' : ''}
                        />
                        {errors.username && (
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
                            ref={register({ required: true })}
                            className={submitted && errors.password ? ' is-invalid' : ''}
                        />
                        {errors.password && (
                            <Form.Control.Feedback type="invalid">
                                {t(txt.LoginPage.password_required)}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Row>
                        <Form.Group>
                            <Button variant="secondary" type="submit">
                                {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                {t(txt.LoginPage.btnLogin)}
                            </Button>
                        </Form.Group>
                        <Form.Group>
                            <Link to="/register" className="btn-link">
                                {t(txt.LoginPage.btnRegister)}
                            </Link>
                        </Form.Group>
                    </Row>
                    <Form.Group>
                        <Button href="/scorer" variant="secondary">
                            Scorer
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
}

export { LoginPage };