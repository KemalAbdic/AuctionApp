import React, {useEffect, useState} from 'react';
import {getProduct, getRelatedProducts, productUrl} from "../../services/ProductService";
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {Button, Form, Image, Table} from "react-bootstrap";
import "./productPage.css"
import {getBidsForProduct, postBidForProduct} from "../../services/BidService";
import {Icon} from "@iconify/react";
import chevronRight from '@iconify/icons-akar-icons/chevron-right';
import {getPersonId} from "../../services/AuthService";
import {alertService} from "../../services/AlertService";
import moment from "moment";
import 'moment-duration-format';
import {useHistory} from "react-router-dom";
import {getLongDate} from "../../services/DateTimeService";
import {placeholderPicture} from "../../services/CommonService";

const ProductPage = ({match}) => {
    const [product, setProduct] = useState(null);
    const {setBreadcrumb} = useBreadcrumbContext();
    const [bids, setBids] = useState([]);
    const [activePhoto, setActivePhoto] = useState(0);
    const [loading, setLoading] = useState(false);
    const [bidAmount, setBidAmount] = useState("");
    const personId = getPersonId();
    const [ownProduct, setOwnProduct] = useState(false);
    const highestBid = bids[0] === undefined ? 0 : bids[0].bidAmount;
    const currentHighestBid = highestBid + 1;
    const [startingPrice, setStartingPrice] = useState();
    const placeholderValue = currentHighestBid > 1 ? "Enter $" + currentHighestBid + " or higher" : "Enter $" + (startingPrice + 1) + " or higher";
    const options = {autoClose: true};
    const [relatedProducts, setRelatedProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const id = match.params.id;
            try {
                const data = await getProduct(id);
                const bidData = await getBidsForProduct(id);
                setProduct(data);
                setStartingPrice(data.startingPrice)
                if (personId === null || data.personId !== personId) {
                    setRelatedProducts(await getRelatedProducts(id));
                }
                const url = match.url.split("/").slice(1, -1);
                setBreadcrumb(data.name, [...url.map((breadcrumb, i) => {
                    return {
                        text: breadcrumb.toLowerCase(),
                        href: "/" + url.slice(0, i + 1).join("/") + "/"
                    }
                }), {text: "Single product"}]);
                setBids(bidData);
                const isOwnProduct = data.personId === personId;
                setOwnProduct(isOwnProduct);
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [match.params.id])

    const handleBid = async () => {
        try {
            if (personId === null) {
                alertService.warning('Warning: You have to be logged in to place bid!', options)
                setBidAmount("")
                return;
            }
            if (ownProduct) {
                alertService.warning('Warning: You cannot bid on your own product!', options)
                setBidAmount("")
            }
            setLoading(true);

            if (bids.length !== 0) {
                if (personId === bids[0].person.id) {
                    alertService.warning('Warning: You cannot outbid yourself!', options)
                    setBidAmount("")
                    setLoading(false)
                    return
                }
            }
            await postBidForProduct(bidAmount, product.id);
            const newBids = await getBidsForProduct(product.id);
            if (personId === newBids[0].person.id) {
                alertService.success('Congrats! You are the highest bidder!', options)
                setBids(newBids);
                setBidAmount("")
            }
        } catch
            (e) {
            console.error(e)
        }
        setLoading(false);
    }
    return product != null ? (
        <div className="product-wrapper">
            <div
                style={bids.length > 0 || relatedProducts.length > 0 ? {marginBottom: "10%"} : {marginBottom: "33%"}}
                className="product-container">
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
                        <div className="product-page-price">
                            Starts from <strong>${product.startingPrice}</strong>
                        </div>
                    </h1>
                    <div className="bid-container">
                        <div className="bid-info">
                            <span>Highest bid: <strong>{highestBid}$</strong></span>
                            <span>Number of bids: <strong>{bids.length}</strong></span>
                            <span>Time left:<strong> {
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
                    <div className="product-gray-line"/>
                    <div className="product-description">
                        {product.description}
                    </div>
                </div>
            </div>

            {ownProduct && bids.length > 0 ? (
                <div className="bidder-table-container">
                    <Table className="bidder-table" responsive style={{marginBottom: 500}}>
                        <thead className="bidder-table-header">
                        <tr className="header-row">
                            <div className="bidder-picture-name">
                                <th>Bidder</th>
                            </div>
                            <div className="date-bid">
                                <th style={{marginRight: 145}}>Date</th>
                                <th>Bid</th>
                            </div>
                        </tr>
                        </thead>
                        <tbody>
                        {bids.map((bid) => (
                            <tr className="bidder-info-row" key={bid.id}>
                                <div className="info-row">
                                    <td className="bidder-info-picture-name">
                                        <Image width="64" height="64"
                                               src={bid.person.pictureUrl === null ? placeholderPicture : bid.person.pictureUrl}
                                               style={{borderRadius: 50}}/>
                                        <div style={{marginLeft: 16}}>
                                            {bid.person.firstName + ' ' + bid.person.lastName}
                                        </div>
                                    </td>
                                    <div className="bidder-info-date-bid">
                                        <td>{getLongDate(bid.date)}</td>
                                        <td style={bids[0].bidAmount === bid.bidAmount ? {
                                            paddingLeft: 71,
                                            color: "#417505",
                                            fontWeight: "bold"
                                        } : {
                                            paddingLeft: 71,
                                            color: "#252525",
                                            fontWeight: "bold"
                                        }}>{'$ ' + bid.bidAmount}
                                        </td>
                                    </div>
                                </div>

                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>) : null}

            {relatedProducts.length > 0 ? (
                <div className="related-container">
                    <h5 className="related-products-title">Related products</h5>
                    <div className="product-gray-line"/>
                    <div className="related-products-container">
                        {relatedProducts.map(product => (
                            <div className="related-product">
                                <div className="related-product-item">
                                    <Image className="related-image"
                                           src={product.url}
                                    />
                                    <Button
                                        className="related-hidden-button"
                                        onClick={() => {
                                            history
                                                .push(productUrl(product));
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        <span className="shop-grid-bid-button-text">Bid </span>
                                        <Icon icon="ic:outline-gavel" color="#8367d8" width="20" height="20"
                                              hFlip={true} inline={true}/>
                                    </Button>
                                    <h5 className="shop-product-title">{product.name}</h5>
                                    <span className="shop-product-price">Start From
                                <span style={{color: '#8367D8'}}> ${product.startingPrice}</span></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    ) : null
}

export default ProductPage;
