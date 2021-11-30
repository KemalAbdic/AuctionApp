import React, {useState} from "react";
import "./header.css";
import {FacebookFill, InstagramFill} from "akar-icons";
import {AiFillGooglePlusCircle, AiFillTwitterCircle} from "react-icons/all";
import {Link, useHistory} from "react-router-dom";
import logo from "../../Images/logo.png"
import {getPerson, getToken, removeSession} from "../../services/AuthService";

let person = getPerson();

function Header() {
    const [loggedIn] = useState(getToken() != null);
    const history = useHistory();

    const logout = () => {
        removeSession();
        window.location.reload();
        history.push("/login");
    }

    return (
        <div>
            <div className="black-header-container">
                <div className="social-networks">
                    <a href="https://www.facebook.com/AtlantBH" rel="noreferrer" target="_blank">
                        <FacebookFill/></a>
                    <a href="https://www.instagram.com/atlantbh" rel="noreferrer" target="_blank">
                        <InstagramFill/></a>
                    <a href="https://www.twitter.com/atlantbh" rel="noreferrer" target="_blank">
                        <AiFillTwitterCircle/></a>
                    <a href="https://www.google.com/search?q=atlantbh" rel="noreferrer" target="_blank">
                        <AiFillGooglePlusCircle/></a>
                </div>
                <div className="login">
                    {!loggedIn ?
                        <div>
                            <Link to="/login">Login</Link>
                            <span> or </span>
                            <Link to="/register">Create an Account</Link>
                        </div>
                        :
                        <div>
                            <span> {person.person.firstName + ' ' + person.person.lastName}</span>
                            <Link onClick={logout} to='/'>
                                Logout
                            </Link>

                        </div>
                    }
                </div>
            </div>
            <div className="white-header-container">
                <Link to="/"><img src={logo} alt="logo"/></Link>
                <div className="links">
                    <Link to="/">HOME</Link>
                    <Link to="/shop">SHOP</Link>
                    <Link to="/">MY ACCOUNT</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;
