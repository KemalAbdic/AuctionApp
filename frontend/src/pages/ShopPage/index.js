import React, {useEffect, useState} from 'react';
import {categoriesRouting, getAllProducts, getCategories} from "../../services/LandingService";
import {Button, Form, Image, ListGroup} from "react-bootstrap";
import "./shop.css"
import {useHistory} from "react-router-dom";
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {Icon} from "@iconify/react";

const Shop = ({match}) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const history = useHistory();
    const {removeBreadcrumb} = useBreadcrumbContext();
    const [maxRange, setMaxRange] = useState(9);
    const url = match.url.split("/").slice(2, -1);

    useEffect(() => {
        removeBreadcrumb();
        const fetchData = async () => {
            try {
                setCategories(await getCategories());
                setProducts(await getAllProducts())
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, [removeBreadcrumb]);

    let categoryProducts = [];
    let allProducts = [];
    products.map(product => ((url[0] === undefined || url[0] === product.categoryName.toLowerCase()) ? categoryProducts.push(product) : allProducts.push(product)))

    const handleClick = () => {
        setMaxRange(prevMaxRange => prevMaxRange + 9)
    }

    return (<div className="shop-page-wrapper">
        <div className="categories-shop-container">
            <ListGroup variant="flush">
                <div className="product-categories">PRODUCT CATEGORIES</div>
                {categories.map(category => (<ListGroup.Item className="category" key={category.id}
                                                             onClick={() => categoriesRouting(history, category)}>{category.name}
                </ListGroup.Item>))}
            </ListGroup>
        </div>
        <div className="shop-product-container">
            <div className="shop-sorting-bar">
                <Form.Select>
                    <option value="1">Default Sorting</option>
                    <option value="2">Sort by Popularity</option>
                    <option value="3">Sort by Rating</option>
                    <option value="4">Sort by Newness</option>
                    <option value="5">Sort by Price</option>
                </Form.Select>
                <div className="arrow-icon"><Icon icon="akar-icons:chevron-down" inline={true}/></div>

            </div>
            <div className="shop-product-grid">
                {categoryProducts
                    .filter((product, i) => i < maxRange)
                    .map(product => (
                        <div className="shop-product"
                             onClick={() =>
                                 history
                                     .push(`/shop/${product.categoryName
                                         .toLowerCase()}/${product.subcategoryName
                                         .toLowerCase()}/${product.id}`)}>
                            <div className="shop-product-item"><Image width="262"
                                                                      height="196"
                                                                      src={product.url}
                            />
                                <h5 className="shop-product-title">{product.name}</h5>
                                <span className="shop-product-price">Start From
                                <span style={{color: '#8367D8'}}> ${product.startingPrice}</span></span></div>
                        </div>))}
            </div>
            {categoryProducts.length > maxRange ? <div className="explore-more-div">
                <Button className="explore-more-button" onClick={handleClick}>EXPLORE MORE </Button>
            </div> : null}
        </div>
    </div>)
}

export default Shop;
