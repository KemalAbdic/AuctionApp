import React, {useEffect, useState} from "react";
import {searchCountProducts} from "../../services/LandingService";
import {Form, ListGroup} from "react-bootstrap";
import {Icon} from "@iconify/react";

const CategoryList = ({filter, handleClick}) => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("");
    const [activeSubcategory, setActiveSubcategory] = useState("");
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCategories(await searchCountProducts())
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setActiveCategory(filter.category || "");
        setActiveSubcategory(filter.subcategory || "");
    }, [filter])

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
                <React.Fragment key={category.name.toLowerCase()}>
                    <ListGroup.Item
                        className="category"
                        action onClick={() => handleCategoryClick(category.name.toLowerCase())}
                        style={category.name.toLowerCase() === activeCategory ? {
                            fontWeight: "bold",
                            marginBottom: 0
                        } : {fontWeight: "normal", marginTop: 12}}
                    >
                        {category.name}
                        {category.name.toLowerCase() === activeCategory ?
                            <Icon icon="akar-icons:minus" width="16" height="16"
                                  style={{left: 160, position: "absolute", color: "#8367D8"}}/> :
                            <Icon icon="akar-icons:plus" width="16" height="16"
                                  style={{left: 160, position: "absolute"}}/>}
                    </ListGroup.Item>
                    {category.name.toLowerCase() === activeCategory ? category.subcategories.map(subcategory => (
                        <Form.Check
                            type="checkbox"
                            label={subcategory.name + ' (' + subcategory.count + ')'}
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
