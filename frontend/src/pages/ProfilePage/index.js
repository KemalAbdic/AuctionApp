import React, {useEffect, useState} from "react";
import Profile from "../../common/ProfileTabs/Profile/";
import Seller from "../../common/ProfileTabs/Seller";
import Bids from "../../common/ProfileTabs/Bids";
import Settings from "../../common/ProfileTabs/Settings";
import {useHistory} from "react-router-dom";
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {Button} from "react-bootstrap";
import {FaUser, MdOutlineMonetizationOn, RiListCheck} from "react-icons/all";

import './profilePage.css'
import {Settings32} from "@carbon/icons-react";

const ProfilePage = () => {

    const {setBreadcrumb} = useBreadcrumbContext();
    const history = useHistory();

    const [activeTab, setActiveTab] = useState(0);

    const tabs = [ undefined, <Profile/>, <Seller/>, <Bids/>, <Settings/>];

    useEffect(() => {
        const urlElements = history.location.pathname.split("/").slice(1);
        if (urlElements.length === 1) {
            setBreadcrumb("My account", [{text: "My account", href: "/profile"}, {text: "Profile"}]);
            setActiveTab(1);
        } else {
            setBreadcrumb("My account", urlElements.map((el, i) => {
                return {
                    text: el.toLowerCase().split("_").join(" "), href: "/" + urlElements.slice(0, i + 1).join("/"),

                }
            }));
            if (urlElements[1] === "seller") {
                setActiveTab(2);
            } else if (urlElements[1] === "bids") {
                setActiveTab(3);
            } else if (urlElements[1] === "settings") {
                setActiveTab(4);
            } else {
                setActiveTab(1);
            }
        }
        // eslint-disable-next-line
    }, [history.location.pathname])

    return (
        <div>
            <div className="profile-tabs-container">
                <Button className="profile-page-button" onClick={() => history.push('/profile')}
                        style={activeTab === 1 ? {
                            backgroundColor: "#8367D8",
                            color: "#FFFFFF"
                        } : {backgroundColor: "#FFFFFF", color: "#252525"}}>
                    <FaUser style={{marginRight: 5}}/>
                    Profile
                </Button>
                <Button className="profile-page-button" onClick={() => history.push('/profile/seller')}
                        style={activeTab === 2 ? {
                            backgroundColor: "#8367D8",
                            color: "#FFFFFF"
                        } : {backgroundColor: "#FFFFFF", color: "#252525"}}>
                    <RiListCheck style={{width: 20, height: 20, marginRight: 5}}/>
                    Seller
                </Button>
                <Button className="profile-page-button" onClick={() => history.push('/profile/bids')}
                        style={activeTab === 3 ? {
                            backgroundColor: "#8367D8",
                            color: "#FFFFFF"
                        } : {backgroundColor: "#FFFFFF", color: "#252525"}}>
                    <MdOutlineMonetizationOn style={{width: 20, height: 20, marginRight: 5}}/>
                    Bids
                </Button>
                <Button className="profile-page-button" onClick={() => history.push('/profile/settings')}
                        style={activeTab === 4 ? {
                            backgroundColor: "#8367D8",
                            color: "#FFFFFF"
                        } : {backgroundColor: "#FFFFFF", color: "#252525"}}>
                    <Settings32 style={{width: 20, height: 20, marginRight: 5}}/>
                    Settings
                </Button>
            </div>
            {tabs[activeTab]}
        </div>)
}

export default ProfilePage
