import React, {useEffect, useState} from "react";
import {getAllSubcategories} from "../../services/LandingService";
import {ListGroup} from "react-bootstrap";
import {Icon} from "@iconify/react";
import {useHistory} from "react-router-dom";

const CategoryList = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(false);
    const history = useHistory();
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

    const handleClick = (selected) => {
        let categoryPath = "";
        if (selected.category !== null)
            categoryPath = "?id=" + selected.category;
        history.push('/shop' + categoryPath);
    }
    return (
        <ListGroup variant="flush">
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
                            <Icon icon="akar-icons:minus" width="16" height="16"/> :
                            <Icon icon="akar-icons:plus" width="16" height="16"/>}
                    </ListGroup.Item>
                </React.Fragment>
            ))}
        </ListGroup>
    )
}

export default CategoryList;
