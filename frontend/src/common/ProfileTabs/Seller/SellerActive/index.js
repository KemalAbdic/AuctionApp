import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {getPersonSellProducts} from "../../../../services/ProductService";
import moment from "moment";
import {getDifferenceBetweenDates} from "../../../../services/DateTimeService";
import {Button, Image, Table} from "react-bootstrap";
import '../seller.css'
import {Icon} from "@iconify/react";

const SellerActive = () => {
    const [currentProducts, setCurrentProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPersonSellProducts();
                setCurrentProducts(data.filter(product => moment.utc(product.auctionEnd).isAfter(moment()) && moment(product.auctionStart).isSameOrBefore(moment())));
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, [])

    const getTimeColumn = (product) => {
        const productAuctionEnd = moment.utc(product.auctionEnd);
        return moment().isSameOrAfter(productAuctionEnd) ? 0 : getDifferenceBetweenDates(moment(), productAuctionEnd);
    }

    return (currentProducts.length > 0 ?
        <Table className="sell-table-wrapper" responsive>
            <thead>
            <tr className="sell-table-header">
                <div className="header-sub">
                    <th style={{marginRight: 130}}>Item</th>
                    <th style={{marginRight: 97}}>Name</th>
                    <th style={{marginLeft: 135}}>Time left</th>
                    <th style={{marginLeft: 88}}>Your Price</th>
                    <th style={{marginLeft: 49}}>No. Bids</th>
                </div>
                <th>Highest Bid</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {currentProducts.map(product => (
                <tr className="sell-table" key={product.id}>
                    <td>
                        <Image style={{cursor: 'pointer', width: 80, height: 60}}
                               onClick={() => history.push(`/shop/${product.categoryName.toLowerCase()}/${product.subcategoryName.toLowerCase()}/${product.id}`)}
                               className="avatar-image-medium" src={product.url}/>
                    </td>
                    <td>
                        <div style={{cursor: 'pointer'}}
                             onClick={() => history.push(`/shop/${product.categoryName.toLowerCase()}/${product.subcategoryName.toLowerCase()}/${product.id}`)}
                             className="sell-table-name">
                            {product.name}
                            <div className="sell-table-id">
                                #{product.id}
                            </div>
                        </div>
                    </td>
                    <td>
                        {getTimeColumn(product)}
                    </td>
                    <td>
                        ${product.startingPrice}
                    </td>
                    <td>{product.bidCount}</td>
                    <td>
                        {product.maxBid !== null ? "$" + product.maxBid : "none"}
                    </td>
                    <td>

                        <Button
                            className="bid-table-button"
                            onClick={() => history.push(`/shop/${product.categoryName.toLowerCase()}/${product.subcategoryName.toLowerCase()}/${product.id}`)}
                        >
                            VIEW
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table> : <Table className="sell-table-wrapper" style={{height: "auto", alignItems: "center"}} responsive>
                <thead>
                <tr className="sell-table-header">
                    <div className="header-sub">
                        <th style={{marginRight: 130}}>Item</th>
                        <th style={{marginRight: 97}}>Name</th>
                        <th style={{marginLeft: 135}}>Time left</th>
                        <th style={{marginLeft: 88}}>Your Price</th>
                        <th style={{marginLeft: 49}}>No. Bids</th>
                    </div>
                    <th>Highest Bid</th>
                    <th/>
                </tr>
                </thead>
                <tbody style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div style={{width: 92, alignItems: "center"}}>
                    <Icon icon="eva:shopping-cart-outline" color="#8367d8" width="92" height="92"/>
                </div>
                <div><span className="sold-tab-text">You do not have any scheduled items for sale.</span></div>
                <Button className="sold-tab-button">START SELLING</Button>
                </tbody>
            </Table>
    )
}

export default SellerActive
