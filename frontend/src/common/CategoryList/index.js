import React, {useEffect, useState} from "react";
import {getAllSubcategories} from "../../services/LandingService";
import {Form, ListGroup} from "react-bootstrap";
import {Icon} from "@iconify/react";

const CategoryList = ({handleClick}) => {
    const [subcategories, setSubcategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("");
    let result = [];
    const [activeSubcategory, setActiveSubcategory] = useState("");
   const [checked, setChecked] = useState(false)

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

    function handleCategoryClick(categoryName) {
        setActiveSubcategory("");
        if (activeCategory === categoryName) {
            setActiveCategory("");
            handleClick({category: null, subcategory: null});
        } else {
            setActiveCategory(categoryName);
            handleClick({category: categoryName, subcategory: null});
        }
    }

    function handleSubcategoryClick(subcategoryName) {
        setActiveSubcategory(subcategoryName);
        if (activeSubcategory === subcategoryName) {
            setActiveSubcategory("")
            handleClick({category: activeCategory, subcategory: null})
            setChecked(false)
        } else {
            setActiveSubcategory(subcategoryName)
            handleClick({category: activeCategory, subcategory: subcategoryName})
            setChecked(true)
        }
    }

    return (
        <ListGroup className="categories-shop-container" variant="flush">
            <ListGroup.Item className="product-categories">PRODUCT CATEGORIES</ListGroup.Item>
            {categories.map(category => (
                <React.Fragment key={category.categoryName}>
                    <ListGroup.Item
                        className="category"
                        action onClick={() => handleCategoryClick(category.categoryName)}
                        style={category.categoryName === activeCategory ? {
                            fontWeight: "bold",
                            marginBottom: 0
                        } : {fontWeight: "normal", marginTop: 12}}
                    >
                        {category.categoryName}
                        {category.categoryName === activeCategory ?
                            <Icon icon="akar-icons:minus" width="16" height="16"
                                  style={{left: 160, position: "absolute", color: "#8367D8"}}/> :
                            <Icon icon="akar-icons:plus" width="16" height="16"
                                  style={{left: 160, position: "absolute"}}/>}
                    </ListGroup.Item>
                    {category.categoryName === activeCategory ? category.subcategories.map(subcategory => (
                        <Form.Check
                            type="checkbox"
                            label={subcategory.name}
                            className="subcategory"
                            key={subcategory.name}
                            action
                            onClick={() => handleSubcategoryClick(subcategory.name)}
                            aria-checked={checked}
                        >
                        </Form.Check>
                    )) : null}
                </React.Fragment>
            ))}
        </ListGroup>
    )
}

export default CategoryList;
