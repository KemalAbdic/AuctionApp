import React, {useEffect, useState} from "react";
import {getAllSubcategories} from "../../services/LandingService";
import {ListGroup} from "react-bootstrap";
import {Icon} from "@iconify/react";

const CategoryList = ({handleClick}) => {
    const [subcategories, setSubcategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(false);
    let result = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setSubcategories(await getAllSubcategories())
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    subcategories.forEach(function (a) {
        let categoryName = a.category.name;
        let categoryId = a.category.id
        if (!this[categoryName]) {
            this[categoryName] = {categoryName: categoryName, categoryId: categoryId, subcategories: []};
            result.push(this[categoryName]);
        }
        this[categoryName].subcategories.push({id: a.id, name: a.name});
    }, {});
    let categories = JSON.parse(JSON.stringify(result));

    const handleCategoryClick = (categoryId) => {
        if (activeCategory === categoryId) {
            setActiveCategory("");
            handleClick({category: null, subcategory: null});
        } else {
            setActiveCategory(categoryId);
            handleClick({category: categoryId, subcategory: null});
        }
    }

    return (
        <ListGroup className="categories-shop-container" variant="flush">
            <ListGroup.Item className="product-categories">PRODUCT CATEGORIES</ListGroup.Item>
            {categories.map(category => (
                <React.Fragment key={category.categoryId}>
                    <ListGroup.Item
                        className="category"
                        action
                        onClick={() => handleCategoryClick(category.categoryId)}
                    >
                        {category.categoryName}
                        {category.categoryId === activeCategory ?
                            <Icon icon="akar-icons:minus" width="16" height="16"
                                  style={{left: 125, position: "absolute"}}/> :
                            <Icon icon="akar-icons:plus" width="16" height="16"
                                  style={{left: 125, position: "absolute"}}/>}
                    </ListGroup.Item>
                </React.Fragment>
            ))}
        </ListGroup>
    )
}

export default CategoryList;
