import React from "react";
import "./register.css";
import {Link} from "react-router-dom";

function Register() {

    return (
        <div className="register-wrapper">
            <div className="register-form-container">
                <div className="register-form-title">
                    <h5>REGISTER</h5>
                </div>
                <form>
                    <div className="all-input-fields">
                        <div className="input-field">
                            <label>First name</label>
                            <input type="text" className="register-text-input" id="firstName"
                                   placeholder="Enter first name"/>
                        </div>
                        <div className="input-field">
                            <label>Last name</label>
                            <input type="text" className="register-text-input" id="lastName"
                                   placeholder="Enter last name"/>
                        </div>
                        <div className="input-field">
                            <label>Enter email</label>
                            <input type="email" className="register-text-input" id="email"
                                   placeholder="Enter email"/>
                        </div>
                        <div className="input-field">
                            <label>Password</label>
                            <input type="password" className="register-text-input" id="password"
                                   placeholder="Password"/>
                        </div>
                    </div>
                    <div className="register-button">
                        <button type="submit" className="register-button">
                            REGISTER
                        </button>
                    </div>
                    <div className="already-registered">
                        <span>Already have an account? <Link to="/"> Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Register;