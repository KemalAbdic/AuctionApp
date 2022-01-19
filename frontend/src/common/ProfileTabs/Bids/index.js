import React, {useEffect, useState} from "react";
import {Button, Image, Table} from "react-bootstrap";
import moment from "moment";
import {useHistory} from "react-router-dom";
import './bids.css'
import {getDifferenceBetweenDates} from "../../../services/DateTimeService";
import {getPersonBidsForProducts} from "../../../services/ProductService";


const Bids = () => {
    const [products, setProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setProducts(await getPersonBidsForProducts());
            } catch (e) {
                console.error(e)
            }
        }

        fetchData();
    }, [])
    console.log(products)

    const getTimeColumn = (product) => {
        const productEndDate = moment.utc(product.auctionEnd);
        return moment().isSameOrAfter(productEndDate) ? 0 : getDifferenceBetweenDates(moment(), productEndDate);
    }


    return (
        <Table className="bid-table-wrapper" responsive>
            <thead>
            <tr className="bid-table-header">
                <th style={{marginRight: 87}}>Item</th>
                <th style={{marginRight: 210}}>Name</th>
                <th style={{marginRight: 100}}>Time left</th>
                <th style={{marginRight: 65}}>Your Price</th>
                <th style={{marginRight: 50}}>No. Bids</th>
                <th>Highest Bid</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {products.map(product => (
                <tr className="bid-table-row" key={product.id}>
                    <div className="bid-item-name">
                        <td>
                            <Image
                                onClick={() => history.push(`/shop/${product.categoryName.toLowerCase()}/${product.subcategoryName.toLowerCase()}/${product.id}`)}
                                className="product-bid-image" src={product.url}/>
                        </td>
                        <td>
                            <div style={{cursor: 'pointer'}}
                                 onClick={() => history.push(`/shop/${product.categoryName.toLowerCase()}/${product.subcategoryName.toLowerCase()}/${product.id}`)}
                                 className="bid-table-name">
                                {product.name}
                                <div className="bid-table-id">
                                    #{product.id}
                                </div>
                            </div>
                        </td>
                    </div>
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
        </Table>
    )
}

export default Bids;
