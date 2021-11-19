import React, {useEffect, useState} from 'react';
import {getProduct} from "../../services/ProductService";
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {Button, Form, Image} from "react-bootstrap";
import "./productPage.css"
import {getBidsForProduct, postBidForProduct} from "../../services/BidService";
import {Icon} from "@iconify/react";
import chevronRight from '@iconify/icons-akar-icons/chevron-right';
import {getPerson} from "../../services/AuthService";
import {alertService} from "../../services/AlertService";
import moment from "moment";
import 'moment-duration-format';

const ProductPage = ({match}) => {
    const [product, setProduct] = useState(null);
    const {setBreadcrumb} = useBreadcrumbContext();
    const [bids, setBids] = useState([]);
    const [activePhoto, setActivePhoto] = useState(0);
    const [loading, setLoading] = useState(false);
    const [bidAmount, setBidAmount] = useState(null);
    const personInfo = getPerson();
    const [ownProduct, setOwnProduct] = useState(false);
    const highestBid = bids[0] === undefined ? 0 : bids[0].bidAmount;
    const currentHighestBid = highestBid + 1;
    const placeholderValue = "Enter $" + currentHighestBid + " or higher";
    const options = {autoClose: true};

    useEffect(() => {
        const fetchData = async () => {
            const id = match.params.id;
            try {
                const data = await getProduct(id);
                const bidData = await getBidsForProduct(id);
                setProduct(data);
                const url = match.url.split("/").slice(1, -1);
                setBreadcrumb(data.name, [...url.map((breadcrumb, i) => {
                    return {
                        text: breadcrumb.toLowerCase(),
                        href: "/" + url.slice(0, i + 1).join("/")
                    }
                }), {text: "Single product"}]);
                setBids(bidData);
                const isOwnProduct = data.personId === personInfo.person.id;
                setOwnProduct(isOwnProduct);
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, [match.params.id])

    const handleBid = async () => {
        try {
            if (personInfo === null) {
                alertService.warning('Warning: You have to be logged in to place bid!', options)
                setBidAmount("")
                return;
            }

            if (ownProduct) {
                alertService.warning('Warning: You cannot bid on your own product!', options)
                setBidAmount("")
            }
            setLoading(true);

            if (personInfo.person.id === bids[0].person.id) {
                alertService.warning('Warning: You cannot outbid yourself!', options)
                setBidAmount("")
                setLoading(false)
                return;
            }
            await postBidForProduct(bidAmount, product.id);
            const newBids = await getBidsForProduct(product.id);
            if (personInfo.person.id === newBids[0].person.id) {
                alertService.success('Congrats! You are the highest bidder!', options)
                setBids(newBids);
                setBidAmount("")
            }
        } catch (e) {
            console.error(e)
        }
        setLoading(false);
    }

    return product != null ? (
        <div className="product-wrapper">
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
                            <span>Time left:<strong>{
                                moment.duration(moment(product.auctionEnd).diff(moment())).format("D [days] h[h] m[m]")
                            }</strong></span>
                        </div>
                        <Form className="bid-entry">
                            <Form.Control
                                disabled={loading}
                                type="text"
                                placeholder={placeholderValue}
                                value={bidAmount}
                                onChange={e => setBidAmount(e.target.value)}
                            />
                            <Button
                                disabled={loading || bidAmount < currentHighestBid}
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
