import React, {useEffect, useState} from 'react';
import {getProduct} from "../../services/ProductService";
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {Button, Image} from "react-bootstrap";
import {IoIosArrowForward} from "react-icons/all";
import "./productPage.css"

const ProductPage = ({match}) => {
    const [product, setProduct] = useState(null);
    const {setBreadcrumb} = useBreadcrumbContext();

    useEffect(() => {
        const fetchData = async () => {
            const id = match.params.id;
            try {
                const data = await getProduct(id);
                setProduct(data);
                const url = match.url.split("/").slice(1, -1);
                setBreadcrumb(data.name, [...url.map((breadcrumb, i) => {
                    return {
                        text: breadcrumb.toUpperCase(),
                        href: "/" + url.slice(0, i + 1).join("/")
                    }
                }), {text: "SINGLE PRODUCT"}]);
            } catch (e) {
                console.log(e.message)
            }
        }
        fetchData();
    }, [match.params.id])

    return product != null ? (
        <div className="product-container">
            <div className="product-pictures-container">
                <Image className="product-image" key={product.pictures[0].id}
                       src={product.pictures[0].url}/>
                <Image className="product-image-small" key={product.pictures[1].id}
                       src={product.pictures[1].url}/>
                <Image className="product-image-small" key={product.pictures[1].id}
                       src={product.pictures[2].url}/>
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
                        <span>Highest bid: <strong>57$</strong></span>
                        <span>Number of bids: <strong>1</strong></span>
                        <span>Time left: <strong>10 Weeks 6 Days</strong></span>
                    </div>
                    <div className="bid-entry">
                        <input type="text" placeholder="Enter $57.00 or higher"/>
                        <Button className="bid-button">
                            PLACE BID
                            <IoIosArrowForward/>
                        </Button>
                    </div>
                </div>
                <div><strong>Details</strong></div>
                <div className="gray-line"/>
                <div className="product-description">
                    {product.description}
                </div>
            </div>
        </div>
    ) : null;
}

export default ProductPage;
