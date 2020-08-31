import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Button, FormLabel } from 'react-bootstrap';

import { userActions } from '../_actions';

import { RootState } from '../_reducers';

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector((state: RootState) => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <Form name="form" onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel>First Name</FormLabel>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')}
                    />
                    {submitted && !user.firstName && <div className="invalid-feedback">First Name is required</div>}
                </FormGroup>
                <FormGroup>
                    <FormLabel>Last Name</FormLabel>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')}
                    />
                    {submitted && !user.lastName && <div className="invalid-feedback">Last Name is required</div>}
                </FormGroup>
                <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')}
                    />
                    {submitted && !user.username && <div className="invalid-feedback">Username is required</div>}
                </FormGroup>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')}
                    />
                    {submitted && !user.password && <div className="invalid-feedback">Password is required</div>}
                </FormGroup>
                <FormGroup>
                    <Button variant="primary" type="submit">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </Button>
                    <Link to="/login" className="btn-link">
                        Cancel
                    </Link>
                </FormGroup>
            </Form>
        </div>
    );
}

export { RegisterPage };
