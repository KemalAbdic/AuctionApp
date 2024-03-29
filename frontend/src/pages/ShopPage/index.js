import React, {useEffect, useMemo, useState} from 'react';
import {getAllProductsByCategoryAndSubcategory, getAllProductsByPrice} from "../../services/LandingService";
import {Button, Form, Image} from "react-bootstrap";
import "./shop.css"
import {useHistory} from "react-router-dom";
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {Icon} from "@iconify/react";
import CategoryList from "../../common/CategoryList";
import * as qs from 'query-string';
import PriceFilter from "../../common/PriceFilter";
import {productUrl} from "../../services/ProductService";

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
    const [activeMinPrice, setActiveMinPrice] = useState(0);
    const [activeMaxPrice, setActiveMaxPrice] = useState(400);
    const url = match.url.split("/");
    const [filter, setFilter] = useState({category: null, subcategory: null, minPrice: null, maxPrice: null});
    const [priceRange, setPriceRange] = useState({min: null, max: null});

    useEffect(() => {
        page = 0;
        removeBreadcrumb();
        const filtered = {
            category: url[2],
            subcategory: url[3],
            minPrice: urlParams.minPrice || 0,
            maxPrice: urlParams.maxPrice || 400
        };
        setFilter(filtered);
        const fetchData = async () => {
            try {
                if (filtered.category === "") {
                    const data = await getAllProductsByPrice(filtered.minPrice, filtered.maxPrice, page, urlParams.sort);
                    setProducts(data.products)
                    setLastPage(data.lastPage)
                } else {
                    const data = await getAllProductsByCategoryAndSubcategory(filtered.category, filtered.subcategory, filtered.minPrice, filtered.maxPrice, page, urlParams.sort)
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

    const memoizedValue = useMemo(() => products.map(({startingPrice}) => startingPrice), [products]);

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
        const filtered = {
            category: url[2],
            subcategory: url[3],
            minPrice: urlParams.minPrice || 0,
            maxPrice: urlParams.maxPrice || 400
        };
        if (filtered.category === "") {
            const data = await getAllProductsByPrice(filtered.minPrice, filtered.maxPrice, page, urlParams.sort);
            setProducts([...products, ...data.products])
            setLastPage(data.lastPage)
        } else {
            const data = await getAllProductsByCategoryAndSubcategory(filtered.category, filtered.subcategory, filtered.minPrice, filtered.maxPrice, page, urlParams.sort)
            setProducts([...products, ...data.products])
            setLastPage(data.lastPage)
        }
    };

    function handleClick(selected) {
        let categoryPath = "";
        let subcategoryPath = "";
        if (selected.category !== null)
            categoryPath = selected.category.toLowerCase();
        if (selected.subcategory !== null)
            subcategoryPath = '/' + selected.subcategory.toLowerCase();
        history.push('/shop/' + categoryPath + subcategoryPath + '?minPrice=' + activeMinPrice + '&maxPrice=' + activeMaxPrice + '&sort=' + activeParam);
    }

    const handlePriceSlide = () => {
        urlParams.minPrice = priceRange.min;
        setActiveMinPrice(priceRange.min)
        setActiveMaxPrice(priceRange.max)
        urlParams.maxPrice = priceRange.max;
        history.push({
            search: qs.stringify(urlParams)
        });
    }

    return (
        <div className="shop-page-wrapper">
            <div className="categories-container">
                <CategoryList filter={filter} handleClick={handleClick}/>
                <PriceFilter prices={memoizedValue}
                             priceRange={priceRange}
                             setPriceRange={setPriceRange}
                             handleClick={() => handlePriceSlide()}
                />
            </div>
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
                                <div className="shop-product">
                                    <div className="shop-product-item">
                                        <Image className="image"
                                               src={product.url}
                                        />
                                        <Button
                                            className="hidden-button"
                                            onClick={() =>
                                                history
                                                    .push(productUrl(product))}
                                        >
                                            <span className="shop-grid-bid-button-text">Bid </span>
                                            <Icon icon="ic:outline-gavel" color="#8367d8" width="20" height="20"
                                                  hFlip={true} inline={true}/>
                                        </Button>
                                        <h5 className="shop-product-title">{product.name}</h5>
                                        <span className="shop-product-price">Start From
                                <span style={{color: '#8367D8'}}> ${product.startingPrice}</span></span>
                                    </div>
                                </div>))}
                    </div>
                    :
                    <div className="shop-list">{products
                        .map(product => (
                            <div className="shop-list-product"
                                 onClick={() =>
                                     history
                                         .push(productUrl(product))}>
                                <div className="shop-list-item">
                                    <Image width="306"
                                           height="230"
                                           src={product.url}
                                    />
                                    <div className="shop-list-info">
                                        <h5 className="shop-list-title">{product.name}</h5>
                                        <span className="shop-list-description"> {product.description}</span>
                                        <span className="shop-list-price">Start From
                                <span style={{color: '#8367D8'}}> ${product.startingPrice}</span>
                                </span>
                                        <Button className="shop-list-bid-button">
                                            <span className="shop-list-bid-button-text">Bid</span>
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
