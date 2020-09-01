import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import { userActions } from '../_actions';

import { RootState } from '../_reducers';

type Inputs = {
    fullName: string;
    username: string;
    password: string;
};

function RegisterPage() {
    const registering = useSelector((state: RootState) => state.registration.registering);
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (data.fullName && data.username && data.password) {
            dispatch(
                userActions.register({ username: data.username, fullName: data.fullName, password: data.password }),
            );
        }
    };

    return (
        <Col lg={{ span: 8, offset: 2 }} sm>
            <h2>Register</h2>
            <Form name="form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="fullName"
                        ref={register({ required: true })}
                        className={errors.fullName ? ' is-invalid' : ''}
                    />
                    {errors.fullName && (
                        <Form.Control.Feedback type="invalid">Fullname is required</Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        ref={register({ required: true })}
                        className={errors.username ? ' is-invalid' : ''}
                    />
                    {errors.username && (
                        <Form.Control.Feedback type="invalid">Username is required</Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        ref={register({ required: true })}
                        className={errors.password ? ' is-invalid' : ''}
                    />
                    {errors.password && (
                        <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </Button>
                    <Link to="/login" className="btn-link">
                        Cancel
                    </Link>
                </Form.Group>
            </Form>
        </Col>
    );
}

export { RegisterPage };
