import React, {useState} from "react";
import {Button} from "react-bootstrap";
import './seller.css'
import SellerActive from "./SellerActive";
import SellerSold from "./SellerSold";
import {useHistory} from "react-router-dom";

const Seller = () => {

    const [activeTab, setActiveTab] = useState(0);

    const tabs = [<SellerActive/>, <SellerSold/>];
    const history = useHistory();


    return (
        <div className="seller-tab-container">
            <Button className="seller-active-tab" onClick={() => setActiveTab(0)}
                    style={activeTab === 0 ? {
                        backgroundColor: "#8367D8",
                        color: "#FFFFFF"
                    } : {backgroundColor: "#FFFFFF", color: "#252525"}}>
                Active
            </Button>
            <Button className="seller-sold-tab"
                    onClick={() => setActiveTab(1)}
                    style={activeTab === 1 ? {
                        backgroundColor: "#8367D8",
                        color: "#FFFFFF"
                    } : {backgroundColor: "#FFFFFF", color: "#252525"}}>
                Sold
            </Button>

            {tabs[activeTab]}
            <Button className="add-item-button"
                    onClick={() => history.push("/seller/sell")}>
                + ADD ITEM
            </Button>
        </div>

    )
}

export default Seller;
