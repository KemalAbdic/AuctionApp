import React, {useEffect, useState} from 'react';
import {getProduct} from "../../services/ProductService";
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {Button, Form, Image} from "react-bootstrap";
import "./productPage.css"
import {getBidsForProduct, postBidForProduct} from "../../services/BidService";
import {Icon} from "@iconify/react";
import chevronRight from '@iconify/icons-akar-icons/chevron-right';
import {getPersonId} from "../../services/AuthService";

const ProductPage = ({match}) => {
    const [product, setProduct] = useState(null);
    const {setBreadcrumb} = useBreadcrumbContext();
    const [bids, setBids] = useState([]);
    const {DateTime} = require('luxon');
    const startDate = DateTime.now();
    const [activePhoto, setActivePhoto] = useState(0);
    const [loading, setLoading] = useState(false);
    const [bidAmount, setBidAmount] = useState(null);
    const personId = getPersonId();


    useEffect(() => {
        const fetchData = async () => {
            const id = match.params.id;

            try {
                const data = await getProduct(id);
                setProduct(data);
                const bidData = await getBidsForProduct(id);
                setBids(bidData);
                const url = match.url.split("/").slice(1, -1);
                setBreadcrumb(data.name, [...url.map((breadcrumb, i) => {
                    return {
                        text: breadcrumb.toLowerCase(),
                        href: "/" + url.slice(0, i + 1).join("/")
                    }
                }), {text: "Single product"}]);
            } catch (e) {
                console.log(e.message)
            }
        }
        fetchData();
    }, [match.params.id])

    const highestBid = bids[0] === undefined ? 0 : bids[0].bidAmount;
    const currentHighestBid = highestBid + 1;
    const placeholderValue = "Enter $" + currentHighestBid + " or higher";

    const handleBid = async () => {
        if (personId === null) {
            setTimeout(function () {
                document.getElementById("e").classList.add('not-logged-in-error');
                document.getElementById("e").innerHTML = "<span>You have to be logged in to place bid!</span>";
                setTimeout(function () {
                    document.getElementById("e").style.display = "none";
                }, 2000);
            }, 1000);
            return;
        }
        setLoading(true);
        try {
            await postBidForProduct(bidAmount, product.id);
            const newBids = await getBidsForProduct(product.id);
            setBids(newBids);
            setBidAmount("");
        } catch (err) {
            console.log(err)
        }
        setLoading(false);
    }

    return product != null ? (
        <div className="product-wrapper">
            <div id="e"></div>
            <div className="product-container">
                <div className="product-pictures-container">
                    <Image className="product-picture" key={product.pictures[0].id}
                           src={product.pictures[activePhoto].url}/>
                    {product.pictures.map((picture, i) => (
                        <Image
                            onClick={() => setActivePhoto(i)}
                            key={picture.id}
                            src={picture.url}
                            className="product-picture-small"
                        />
                    ))}
                </div>
                <div className="product-details-container">
                    <h1 className="product-page-title">
                        {product.name}
                        <div className="product-price">
                            Starts from <strong>${product.startingPrice}</strong>
                        </div>
                    </h1>
                    <div className="bid-container">
                        <div className="bid-info">
                            <span>Highest bid: <strong>{highestBid}$</strong></span>
                            <span>Number of bids: <strong>{bids.length}</strong></span>
                            <span>Time left: <strong>{DateTime.fromISO(product.auctionEnd).diff(DateTime.fromISO(startDate),
                                ['days']).toFormat("d 'days' h'h' m'm'")}</strong></span>
                        </div>
                        <Form className="bid-entry">
                            <Form.Control
                                disabled={loading}
                                type="text"
                                placeholder={placeholderValue}
                                onChange={e => setBidAmount(e.target.value)}
                            />
                            <Button
                                disabled={loading}
                                className="bid-button"
                                onClick={handleBid}
                            >
                                <span className="bid-button-text">PLACE BID</span>
                                <Icon icon={chevronRight} color="#252525" width="16" height="16" inline={true}/>
                            </Button>
                        </Form>
                    </div>
                    <div><strong>Details</strong></div>
                    <div className="gray-line"/>
                    <div className="product-description">
                        {product.description}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default ProductPage;
