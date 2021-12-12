import React, {useEffect, useState} from 'react';
import {getAllProducts, getAllProductsByCategory} from "../../services/LandingService";
import {Button, Form, Image} from "react-bootstrap";
import "./shop.css"
import {useHistory} from "react-router-dom";
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {Icon} from "@iconify/react";
import CategoryList from "../../common/CategoryList";
import * as qs from 'query-string';

let page = 0;

const Shop = ({match}) => {
    const [products, setProducts] = useState([]);
    const history = useHistory();
    const {removeBreadcrumb} = useBreadcrumbContext();
    const [viewStyle, setViewStyle] = useState("grid");
    const [activeButton, setActiveButton] = useState(0);
    const [lastPage, setLastPage] = useState(true);
    const urlParams = qs.parse(history.location.search);
    const [activeParam, setActiveParam] = useState("default");
    useEffect(() => {

        page = 0;
        removeBreadcrumb();
        const fetchData = async () => {
            try {
                if (urlParams.id === undefined) {
                    const data = await getAllProducts(page, urlParams.sort);
                    setProducts(data.products)
                    setLastPage(data.lastPage)
                } else {
                    const data = await getAllProductsByCategory(urlParams.id, page, urlParams.sort)
                    setProducts(data.products)
                    setLastPage(data.lastPage)
                }
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [removeBreadcrumb, match.url, history.location.search]);


    const handleGridChange = (e) => {
        setActiveButton(0)
        setViewStyle(e);
    }
    const handleListChange = (e) => {
        setActiveButton(1)
        setViewStyle(e);
    }

    const handleSortProducts = async (sort) => {
        page = 0;
        urlParams.sort = sort;
        setActiveParam(sort)
        history.push({search: qs.stringify(urlParams)});
    }

    const handleExploreMore = async () => {
        page++;
        if (urlParams.id === undefined) {
            const data = await getAllProducts(page, urlParams.sort);
            setProducts([...products, ...data.products])
            setLastPage(data.lastPage)
        } else {
            const data = await getAllProductsByCategory(urlParams.id, page, urlParams.sort)
            setProducts([...products, ...data.products])
            setLastPage(data.lastPage)
        }
    };

    function handleClick(selected) {
        let categoryPath = "";
        if (selected.category !== null)
            categoryPath = "?id=" + selected.category + "&sort=" +activeParam;
        history.push('/shop' + categoryPath);
    }

    return (<div className="shop-page-wrapper">
        <CategoryList handleClick={handleClick}  />
        <div className="shop-product-container">
            <div className="sorting-grid-list">
                <div className="shop-sorting-bar">
                    <Form.Select defaultValue={urlParams.sort}
                                 onChange={(e) => handleSortProducts(e.target.value)}>
                        <option value="default">Default Sorting</option>
                        <option value="new">Sort by New Products</option>
                        <option value="new_desc">Sort by Last Chance</option>
                        <option value="price">Sort by Price: Low to High</option>
                        <option value="price_desc">Sort by Price: High to Low</option>
                    </Form.Select>
                    <div className="arrow-icon"><Icon icon="akar-icons:chevron-down"/></div>
                </div>
                <div className="toggle-style">
                    <Button style={activeButton === 0 ? {color: '#8367d8'} : null}
                            aria-pressed={activeButton ? '0' : '1'}
                            className="toggle-button"
                            onClick={() => handleGridChange("grid")}>
                        <Icon icon="mdi-light:grid" width="24" height="24" inline={true}/>
                        <span className="toggle-text" style={{paddingRight: '27px'}}>Grid</span></Button>
                    <Button style={activeButton !== 0 ? {color: '#8367d8'} : null}
                            aria-pressed={activeButton ? '0' : '1'}
                            className="toggle-button"
                            onClick={() => handleListChange("list")}>
                        <Icon icon="mdi-light:menu" width="24" height="24" inline={true}/><span
                        className="toggle-text">List</span></Button>
                </div>
            </div>
            {viewStyle === "grid" ?
                <div className="shop-grid">
                    {products
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
                <div className="shop-list">{products
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

            {!lastPage ? <div className="explore-more-div">
                <Button className="explore-more-button" onClick={handleExploreMore}>EXPLORE MORE </Button>
            </div> : null}
        </div>
    </div>)
}

export default Shop;
