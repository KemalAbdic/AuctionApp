import React from "react";
import "./register.css";
import {Button, Form} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {loggedIn, register, setSession} from "../../services/AuthService";
import {Formik} from "formik";
import * as yup from 'yup';


const Register = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);

    const validationSchema = yup.object().shape({
        firstName: yup.string()
            .required("*First name is required")
            .matches(/^[^\p{P}\p{S}\s\d]*$/u,
                "*The first name can't contain special characters, numbers or whitespaces"),
        lastName: yup.string()
            .required("*Last name is required")
            .matches(/^([^\p{P}\p{S}\s\d]+[ -]?[^\p{P}\p{S}\s\d]+)*$/u,
                "*The last name can only contain characters and space or dash"),
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

    const handleSubmit = async (newUser) => {
        setLoading(true);
        try {
            const person = await register(newUser);
            setSession(person, person.token);
            setLoading(false);
            history.push("/");
            window.location.reload();
            loggedIn(true);
        } catch (e) {
        }
        setLoading(false);
    }

    return (
        <div className="register-wrapper">
            <div className="register-form-container">
                <div className="register-form-title">
                    <h5>REGISTER</h5>
                </div>
                <Formik validationSchema={validationSchema}
                        initialValues={{firstName: "", lastName: "", email: "", password: ""}}
                        onSubmit={handleSubmit}>
                    {({
                          handleSubmit,
                          handleChange,
                          touched,
                          errors,
                      }) => (
                        <Form className="all-input-fields" onSubmit={handleSubmit}>
                            <Form.Group className="input-field">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    className="register-text-input"
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    isInvalid={(touched.firstName && errors.firstName)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="input-field">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    className="register-text-input"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    isInvalid={(touched.lastName && errors.lastName)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="input-field">
                                <Form.Label>Enter Email</Form.Label>
                                <Form.Control
                                    className="register-text-input"
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
                                    className="register-text-input"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    isInvalid={(touched.password && errors.password)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button disabled={loading} className="register-button" type="submit">
                                REGISTER
                            </Button>
                            <Form.Text className="already-registered">
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

export default Register;
