import React from "react";
import "./header.css";
import {FacebookFill, InstagramFill, TwitterFill} from "akar-icons";


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
                        <TwitterFill/></a>
                </div>
                <div className="login">
                    <a href="#">Login</a>
                    <span> or </span>
                    <a href="#">Create an Account</a>
                </div>
            </div>
            <div className="white-header-container">
                <img src="../images/logo.png" alt="logo"/>
                {/* <input type="text" placeholder="Try enter: Shoes" className="search-bar"/>*/}
                <div className="links">
                    <a href="#">HOME</a>
                    <a href="#">SHOP</a>
                    <a href="#">MY ACCOUNT</a>
                </div>
            </div>
        </div>
    )
}

export default Header;
