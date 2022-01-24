import React, {useEffect, useState} from "react";
import "./header.css";
import {FacebookFill, InstagramFill} from "akar-icons";
import {AiFillGooglePlusCircle, AiFillTwitterCircle} from "react-icons/all";
import {Link, useHistory} from "react-router-dom";
import logo from "../../Images/logo.png"
import {getPerson, getToken, removeSession} from "../../services/AuthService";
import {ListGroup} from "react-bootstrap";
import {getPersonSellProducts} from "../../services/ProductService";
import moment from "moment";

function Header() {
    const [loggedIn] = useState(getToken() != null);
    const history = useHistory();
    const [showDropdown, setShowDropdown] = useState(false);
    let user = getPerson();
    const [currentProducts, setCurrentProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPersonSellProducts();
                setCurrentProducts(
                    data.filter(
                        product =>
                            moment.utc(product.auctionEnd).isAfter(moment()) &&
                            moment(product.auctionStart).isSameOrBefore(moment())
                    )
                );
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, [])

    const logout = () => {
        removeSession();
        history.push("/login");
        window.location.reload();
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
                            <span> {user.person.firstName + ' ' + user.person.lastName}</span>
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
                    <Link to="/shop/">SHOP</Link>
                    <Link to="/"
                          style={{marginRight: 0}}
                          onMouseEnter={() => setShowDropdown(true)}
                          onMouseLeave={() => setShowDropdown(false)}
                    >
                        MY ACCOUNT</Link>
                    {showDropdown ?
                        <ListGroup
                            className="profile-dropdown"
                            variant="filter"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <ListGroup.Item className="dropdown-item"
                                            style={{paddingTop: 15}}
                                            onClick={() => loggedIn ? history.push('/profile') : history.push('/register')}>
                                Profile</ListGroup.Item>
                            {currentProducts.length > 0 ? <ListGroup.Item className="dropdown-item"
                                                                          onClick={() => loggedIn ? history.push('/profile/seller') : history.push('/register')}>
                                Your Products</ListGroup.Item> : <ListGroup.Item className="dropdown-item"
                                                                                 onClick={() => loggedIn ? history.push('/profile/seller') : history.push('/register')}>
                                Become Seller</ListGroup.Item>}

                            <ListGroup.Item className="dropdown-item"
                                            onClick={() => loggedIn ? history.push('/profile/bids') : history.push('/register')}>Your
                                Bids</ListGroup.Item>
                            <ListGroup.Item className="dropdown-item"
                                            style={{paddingBottom: 24}}
                                            onClick={() => loggedIn ? history.push('/profile/settings') : history.push('/register')}>Settings</ListGroup.Item>
                        </ListGroup> : null}
                </div>
            </div>
        </div>
    )
}

export default Header;
