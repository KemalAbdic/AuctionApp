import React, {useEffect, useState} from 'react';
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {getSubcategories} from "../../services/LandingService";

import "./allCategories.css"
import {useHistory} from "react-router-dom";

const AllCategories = () => {
    const {setBreadcrumb} = useBreadcrumbContext();
    let [subcategories, setSubcategories] = useState([]);
    const history = useHistory();

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

    console.log(subcategories)

    let result = [];
    subcategories.forEach(function (a) {
        let categoryName = a.categoryName;
        let categoryId = a.categoryId
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
                        <h3 style={{paddingBottom: "32px"}} key={item.categoryId}>
                            <span
                                onClick={() =>
                                    history.push(`/shop/${item.categoryName.split(' ').join('_').toLowerCase()}/`)}>
                                {item.categoryName}
                            </span>
                        </h3>
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
