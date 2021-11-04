import React from "react";
import "./header.css";
import {FacebookFill, InstagramFill} from "akar-icons";
import {AiFillGooglePlusCircle, AiFillTwitterCircle} from "react-icons/all";
import {Link} from "react-router-dom";
import logo from "./../../Images/logo.png"


function Header() {

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
                    <a href="/#">Login</a>
                    <span> or </span>
                    <Link to="/register">Create an Account</Link>
                </div>
            </div>
            <div className="white-header-container">
                <Link to="/"><img src={logo} alt="logo"/></Link>
            {/* <input type="text" placeholder="Try enter: Shoes" className="search-bar"/>*/}
            <div className="links">
                <a href="/#">HOME</a>
                <a href="/#">SHOP</a>
                <a href="/#">MY ACCOUNT</a>
            </div>
        </div>
</div>
)
}

export default Header;
