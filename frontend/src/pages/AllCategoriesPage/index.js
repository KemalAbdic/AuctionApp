import React, {useEffect, useState} from 'react';
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {getSubcategories} from "../../services/LandingService";

import "./allCategories.css"

const AllCategories = () => {
    const {setBreadcrumb} = useBreadcrumbContext();
    let [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        setBreadcrumb("All Categories", [{text: "Home", href: "/"}, {text: "All Categories"}]);
        const fetchData = async () => {
            try {
                setSubcategories(await getSubcategories())
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    let result = [];
    subcategories.forEach(function (a) {
        let categoryName = a.category.name;
        let categoryId = a.category.id
        if (!this[categoryName]) {
            this[categoryName] = {categoryName: categoryName, categoryId: categoryId, subcategories: []};
            result.push(this[categoryName]);
        }
        this[categoryName].subcategories.push({id: a.id, name: a.name});
    }, {});

    return (
        <div className="all-categories-wrapper">
            <div className="all-categories-container">
                {result.map(item => (
                    <div className="categories-list">
                        <h3 style={{paddingBottom: "32px"}} key={item.categoryId}>{item.categoryName}</h3>
                        {item.subcategories.map(subcategory =>
                            <div className="subcategories" key={subcategory.id}> {subcategory.name}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )

}

export default AllCategories;
