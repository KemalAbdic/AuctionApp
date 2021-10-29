import React from "react";
import "./footer.css";
import {FacebookFill, InstagramFill} from "akar-icons";
import {AiFillGooglePlusCircle, AiFillTwitterCircle} from "react-icons/all";
import {Link} from "react-router-dom";

function Footer() {

    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-content-text"> AUCTION</div>
                <ul>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/terms">Terms and Conditions</Link></li>
                    <li><Link to="/privacy">Privacy and Policy</Link></li>
                </ul>

            </div>
            <div className="footer-content">
                <div className="footer-content-text"> GET IN TOUCH</div>
                <a>Call Us at +123 797-567-2535</a>
                <a>support@auction.com</a>
                <div className="social-networks">
                    <a href="https://www.facebook.com/AtlantBH" rel="noreferrer" target="_blank">
                        <FacebookFill/></a>
                    <a href="https://www.instagram.com/atlantbh" rel="noreferrer" target="_blank">
                        <InstagramFill/></a>
                    <a href="https://www.twitter.com/atlantbh" rel="noreferrer" target="_blank">
                        <AiFillTwitterCircle/></a>
                    <a href="https://www.twitter.com/atlantbh" rel="noreferrer" target="_blank">
                        <AiFillGooglePlusCircle/></a>
                </div>
            </div>
            <div className="footer-content">
                <div className="footer-content-text">NEWSLETTER</div>
                <label className="footer-contact">Enter your email address and get notified<br/>
                    about new products. We hate spam!</label>
                {/* <div className="footer-newsletter">
                    <input type="text" placeholder="Your Email address"/>
                    <button>GO <ChevronRight/></button>
                </div>*/}
            </div>
        </div>
    )
}

export default Footer;
