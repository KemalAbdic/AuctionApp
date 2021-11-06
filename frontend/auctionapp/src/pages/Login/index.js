import React from 'react';
import {Button, Form} from "react-bootstrap";
import {Formik} from 'formik';
import * as yup from 'yup';
import "./login.css"
import {getPersonCredentials, login, setPersonCredentials, setSession} from "../../services/AuthService";
import {useHistory} from "react-router-dom";
import {Link} from "@material-ui/core";

function Login() {
    const history = useHistory();
    const personCredentials = getPersonCredentials();
    const [loading, setLoading] = React.useState(false);

    const validationSchema = yup.object().shape({
        email: yup.string()
            .email("*Email must be valid")
            .required("*Email is required")
            // eslint-disable-next-line
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "*Email is not valid"),
        password: yup.string().required("*Password is required")
            // eslint-disable-next-line
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "*Password must be at least 8 characters long. There must be at least one digit, one lowercase and one uppercase letter!")
    });

    const handleSubmit = async (user) => {
        setLoading(true);
        try {
            const person = await login(user);
            setSession(person, person.token);
            setPersonCredentials(user.email);
            setLoading(false);
            history.push("/");
            window.location.reload();
        } catch (e) {
        }
        setLoading(false);
    }


    return (
        <div className="login-wrapper">
            <div className="login-form-container">
                <div className="login-form-title">
                    <h5>LOGIN</h5>
                </div>
                <Formik validationSchema={validationSchema}
                        initialValues={{email: personCredentials.email, password: personCredentials.password}}
                        onSubmit={handleSubmit}>
                    {({
                          handleSubmit,
                          handleChange,
                          touched,
                          errors,
                      }) => (
                        <Form className="all-input-fields" onSubmit={handleSubmit}>
                            <Form.Group className="input-field">
                                <Form.Label>Enter Email</Form.Label>
                                <Form.Control
                                    className="login-text-input"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    isInvalid={(touched.email && errors.email)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="login-text-input"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    isInvalid={(errors.email && touched.email) && <span style={{
                                        color: 'red',
                                        fontSize: '0.8rem',
                                        marginLeft: '1.5rem'
                                    }}>{errors.email}</span>}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button disabled={loading} className="login-button" type="submit">
                                LOGIN
                            </Button>
                            <Form.Text className="reset-password">
                                <Link to="/">
                                    Forgot password?
                                </Link>
                            </Form.Text>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login;
