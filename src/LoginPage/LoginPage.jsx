import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";

import { userActions } from "../_actions";

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector((state) => state.authentication.loggingIn);
    const dispatch = useDispatch();

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
            <Col lg={{ span: 8, offset: 2 }} sm>
                <h2>Login</h2>
                <Form name="form" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            className={
                                submitted && !username ? " is-invalid" : ""
                            }
                        />
                        {submitted && !username && (
                            <Form.Control.Feedback type="invalid">
                                Username is required
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className={
                                submitted && !password ? " is-invalid" : ""
                            }
                        />
                        {submitted && !password && (
                            <Form.Control.Feedback type="invalid">
                                Password is required
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Button variant="secondary" type="submit">
                            {loggingIn && (
                                <span className="spinner-border spinner-border-sm mr-1"></span>
                            )}
                            Login
                        </Button>
                        <Link to="/register" className="btn-link">
                            Register
                        </Link>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
}

export { LoginPage };
