import React from "react";
import "./footer.css";
import {FacebookFill, InstagramFill, TwitterFill} from "akar-icons";

function Footer() {

    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-content-text"> AUCTION</div>
                <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/terms">Terms and Conditions</a></li>
                    <li><a href="/privacy">Privacy and Policy</a></li>
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
                        <TwitterFill/></a>
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
