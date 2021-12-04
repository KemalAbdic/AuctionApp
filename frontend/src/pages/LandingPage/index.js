import React, {useEffect, useState} from "react";
import {Button, Image, ListGroup} from "react-bootstrap";
import {
    categoriesRouting,
    getCategories,
    getLastProducts,
    getNewProducts,
    getRandomProduct
} from "../../services/LandingService";
import chevronRight from "@iconify/icons-akar-icons/chevron-right";
import {Icon} from "@iconify/react";
import './landingPage.css'
import {useHistory} from "react-router-dom";
import {useBreadcrumbContext} from "../../BreadcrumbContext";


const LandingPage = () => {

    const [categories, setCategories] = useState([]);
    const [randomProduct, setRandomProduct] = useState([]);
    const [newAndLastProducts, setNewAndLastProducts] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const history = useHistory();
    const {removeBreadcrumb} = useBreadcrumbContext();

    useEffect(() => {
        removeBreadcrumb();
        const fetchData = async () => {
            try {
                setCategories(await getCategories());
                setRandomProduct(await getRandomProduct())
                const newProducts = await getNewProducts();
                const lastProducts = await getLastProducts();
                setNewAndLastProducts([newProducts, lastProducts]);
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, [removeBreadcrumb])

    return (
        <div className="landing-page-wrapper">
            <div className="categories-product-container">
                <ListGroup variant="categories">
                    <ListGroup.Item style={{
                        background: '#FCFCFC',
                        padding: '16',
                        color: '#8367D8',
                        paddingBottom: 0,
                        paddingTop: 32,
                        fontWeight: 'bold',
                        marginBottom: -16
                    }}>CATEGORIES
                    </ListGroup.Item>
                    {categories
                        .map(category => (
                            <ListGroup.Item
                                key={category.name}
                                action onClick={() => categoriesRouting(history, category)}>
                                {category.name}
                            </ListGroup.Item>))}
                    <ListGroup.Item action onClick={() => history.push("/all")}>
                        All Categories
                    </ListGroup.Item>
                </ListGroup>
                {randomProduct.length !== 0 ?
                    <div className="random-product-container">
                        <div className="random-product-info">
                            <h1 className="random-product-name">
                                {randomProduct[0].name}
                            </h1>

                            <div className="random-product-price">
                                Start From ${randomProduct[0].startingPrice}
                            </div>
                            <div className="random-product-description">
                                {randomProduct[0].description}
                            </div>

                            <Button className={'bid-now-button'}
                                    onClick={() => history.push(`/shop/${randomProduct[0].categoryName.toLowerCase()}/${randomProduct[0].subcategoryName.toLowerCase()}/${randomProduct[0].id}`)}>
                                <span className="bid-now-text">BID NOW</span>
                                <Icon icon={chevronRight} color="#252525" width="16" height="16" inline={true}/>
                            </Button>
                        </div>
                        <Image style={{width: 357, height: 267.75, marginLeft: 30}} src={randomProduct[0].url}/>
                    </div> : null}
            </div>

            <div className="new-last-container">
                <div className="tab-container">
                    <div className="tab-item">
                        <div style={activeTab === 0 ? {borderBottom: '3px solid #8367d8', fontWeight: '600'} : null}
                             className="nav-link"
                             onClick={() => {
                                 setActiveTab(0);
                             }}>New Arrivals
                        </div>
                    </div>
                    <div className="tab-item">
                        <div style={activeTab === 1 ? {borderBottom: '3px solid #8367d8', fontWeight: '600'} : null}
                             className="nav-link"
                             onClick={() => {
                                 setActiveTab(1);
                             }}>Last Chance
                        </div>
                    </div>
                </div>
                <div className="gray-line"/>
                <div className="tab-item-container">
                    {newAndLastProducts.length !== 0 ? newAndLastProducts[activeTab].map(product => (
                        <div className="tab-product"
                             onClick={() => history.push(`/shop/${product.categoryName.toLowerCase()}/${product.subcategoryName.toLowerCase()}/${product.id}`)}>
                            <Image width="262"
                                   height="196"
                                   src={product.url}
                            />
                            <h5 className="product-title">{product.name}</h5>
                            <span className="product-price">Start From
                                <span style={{color: '#8367D8'}}> ${product.startingPrice}</span>
                            </span>
                        </div>
                    )) : null}
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
