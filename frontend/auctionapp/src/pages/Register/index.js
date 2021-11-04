import React, {useState} from "react";
import "./register.css";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router-dom";


const Register = () => {
    let history = useHistory();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const {firstName, lastName, email, password} = formData;

    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        const newUser = {
            firstName,
            lastName,
            email,
            password,
        };
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            };
            const body = JSON.stringify(newUser);
            console.log(body)
            const res = await axios.post("http://localhost:8080" + "/auth/register", body, config);
            if (res.data) {
                return JSON.stringify(res.data);
            }
        } catch (err) {
            console.error(err);
        }

    };


    return (
        <div className="register-wrapper">
            <div className="register-form-container">
                <div className="register-form-title">
                    <h5>REGISTER</h5>
                </div>
                <Form onSubmit={onSubmit}>
                    <div className="all-input-fields">
                        <div className="input-field">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                type="text"
                                className="register-text-input"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className="input-field">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                type="text"
                                className="register-text-input"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                placeholder="Enter last name"
                            />
                        </div>
                        <div className="input-field">
                            <Form.Label>Enter email</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                type="email"
                                className="register-text-input"
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
                                className="register-text-input"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div className="register-button">
                        <Button type="submit"
                                className="register-button">
                            REGISTER
                        </Button>
                    </div>
                    <div className="already-registered">
                        <span>Already have an account? <label
                            onClick={() => history.push("/login", {from: 'register'})}> Login</label></span>
                    </div>
                </Form>
            </div>
        </div>
    )

}

export default Register;