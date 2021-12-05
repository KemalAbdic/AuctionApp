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
    const [viewStyle, setViewStyle] = useState("grid");
    const [activeButton, setActiveButton] = useState(0);
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

    const handleGridChange = (e) => {
        setActiveButton(0)
        setViewStyle(e);
    }
    const handleListChange = (e) => {
        setActiveButton(1)
        setViewStyle(e);
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
            <div className="sorting-grid-list">
                <div className="shop-sorting-bar">
                    <Form.Select>
                        <option value="1">Default Sorting</option>
                        <option value="2">Sort by Popularity</option>
                        <option value="3">Sort by Rating</option>
                        <option value="4">Sort by Newness</option>
                        <option value="5">Sort by Price</option>
                    </Form.Select>
                    <div className="arrow-icon"><Icon icon="akar-icons:chevron-down"/></div>
                </div>
                <div className="toggle-style">
                    <Button style={activeButton === 0 ? {color: '#8367d8'} : null}
                            aria-pressed={activeButton ? '0' : '1'} className="toggle-button"
                            onClick={() => handleGridChange("grid")}>
                        <Icon icon="mdi-light:grid" width="24" height="24" inline={true}/><span className="toggle-text"
                                                                                                style={{paddingRight: '27px'}}>Grid</span></Button>
                    <Button style={activeButton !== 0 ? {color: '#8367d8'} : null}
                            aria-pressed={activeButton ? '0' : '1'} className="toggle-button"
                            onClick={() => handleListChange("list")}>
                        <Icon icon="mdi-light:menu" width="24" height="24" inline={true}/><span
                        className="toggle-text">List</span></Button>
                </div>
            </div>
            {viewStyle === "grid" ?
                <div className="shop-grid">
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
                :
                <div className="shop-list">{categoryProducts
                    .filter((product, i) => i < maxRange)
                    .map(product => (
                        <div className="shop-list-product"
                             onClick={() =>
                                 history
                                     .push(`/shop/${product.categoryName
                                         .toLowerCase()}/${product.subcategoryName
                                         .toLowerCase()}/${product.id}`)}>
                            <div className="shop-list-item">
                                <Image width="306" height="230" src={product.url}/>
                                <div className="shop-list-info">
                                    <h5 className="shop-list-title">{product.name}</h5>
                                    <span className="shop-list-description"> {product.description}</span>
                                    <span className="shop-list-price">Start From
                                <span style={{color: '#8367D8'}}> ${product.startingPrice}</span>
                                </span>
                                    <Button className="shop-list-bid-button"><span
                                        className="shop-list-bid-button-text">Bid</span>
                                        <Icon icon="ic:outline-gavel" color="#c4c4c4" width="24" height="24"
                                              hFlip={true} inline={true}/>
                                    </Button>
                                </div>
                            </div>
                        </div>))}
                </div>}

            {categoryProducts.length > maxRange ? <div className="explore-more-div">
                <Button className="explore-more-button" onClick={handleClick}>EXPLORE MORE </Button>
            </div> : null}
        </div>
    </div>)
}

export default Shop;
