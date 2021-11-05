import React, {useState} from 'react';
import {Anchor, Button, Form} from "react-bootstrap";

import "./login.css"
import {login, setSession} from "../../services/AuthService";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password} = formData;

    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();

        const existingUser = {
            email,
            password,
        };
        try {

            const person = await login(existingUser);
            setSession(person, person.token);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-form-container">
                <div className="login-form-title">
                    <h5>LOGIN</h5>
                </div>
                <Form onSubmit={onSubmit}>
                    <div className="all-input-fields">
                        <div className="input-field">
                            <Form.Label>Enter email</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                type={email}
                                className="login-text-input"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="input-field">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                type="password"
                                className="login-text-input"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div className="login-button">
                        <Button type="submit"
                                className="login-button">
                            LOGIN
                        </Button>
                    </div>
                    <div className="reset-password">
                        <Anchor href="/">Forgot password?</Anchor>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;