import React, {useEffect} from 'react';
import {Button, Form} from "react-bootstrap";
import {Formik} from 'formik';
import * as yup from 'yup';
import "./login.css"
import {
    getPersonCredentials,
    loggedIn,
    login,
    removePersonCredentials,
    setPersonCredentials,
    setSession
} from "../../services/AuthService";
import {useHistory} from "react-router-dom";
import {useBreadcrumbContext} from "../../BreadcrumbContext";


const Login = () => {
    const {setBreadcrumb} = useBreadcrumbContext();
    useEffect(() => {
        setBreadcrumb("LOGIN", []);
    }, []);
    const history = useHistory();
    const personCredentials = getPersonCredentials();
    const [loading, setLoading] = React.useState(false);

    const validationSchema = yup.object().shape({
        email: yup.string()
            .email("*Email must be valid")
            .required("*Email is required").nullable()
            // eslint-disable-next-line
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "*Email is not valid"),
        password: yup.string().required("*Password is required").nullable()
            // eslint-disable-next-line
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "*Password must be at least 8 characters long. There must be at least one digit, one lowercase and one uppercase letter!"),
        remember: yup.bool()
    });

    const handleSubmit = async (user) => {
        setLoading(true);
        try {

            const person = await login(user);
            setSession(person, person.token);
            if (user.remember) {
                setPersonCredentials(user.email, user.password);
            } else {
                removePersonCredentials();
            }
            setLoading(false);
            history.push("/");
            loggedIn(true);
            window.location.reload();
        } catch (e) {
            setTimeout(function () {
                document.getElementById("e")
                    .style.cssText = `
                                     width: 100%;
                                     height: 60px;
                                     font-family: "Lato", sans-serif;
                                     font-size: 24px;
                                     font-weight: normal;
                                     letter-spacing: 0.84px;
                                     display: flex;
                                     justify-content: center;
                                     align-items: center;
                                     opacity: 1;
                                     margin-bottom: 24px;
                                     border: 1px solid #f1a899;
                                     background: #fddfdf;
                                     color: #5f3f3f
                                                            `;
                document.getElementById("e").innerHTML = "<span>Wrong username or password!</span>";
                setTimeout(function () {
                    document.getElementById("e").style.display = "none";
                }, 2000);
            }, 1000);

        }
        setLoading(false);
    }


    return (

        <div className="login-wrapper">
            <div id="e">

            </div>
            <div className="login-form-container">
                <div className="login-form-title">
                    <h5>LOGIN</h5>
                </div>
                <Formik validationSchema={validationSchema}
                        validateOnChange={false}
                        initialValues={{
                            email: personCredentials.email,
                            password: personCredentials.password,
                            remember: personCredentials.email !== null
                        }}

                        onSubmit={handleSubmit}>

                    {({
                          handleSubmit,
                          handleChange,
                          touched,
                          errors,
                      }) => (
                        <Form noValidate className="all-input-fields" onSubmit={handleSubmit}>
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
                                    defaultValue={personCredentials.password || ""}
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
                            <Form.Check
                                type="checkbox"
                                className="remember-checkbox"
                                label="Remember me"
                                name="remember"
                                defaultChecked={personCredentials.email !== null}
                                onChange={handleChange}
                            />
                            <Button disabled={loading} className="login-button" type="submit">
                                LOGIN
                            </Button>
                            {/* <Form.Text className="reset-password">
                                <Link to="/">
                                    Forgot password?
                                </Link>
                            </Form.Text> */}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login;
