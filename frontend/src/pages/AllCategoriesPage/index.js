import React, {useEffect, useState} from 'react';
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {getCategories} from "../../services/LandingService";

import "./allCategories.css"

const AllCategories = () => {
    const {setBreadcrumb} = useBreadcrumbContext();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setBreadcrumb("All Categories", [{text: "Home", href: "/"}, {text: "All Categories"}]);
        const fetchData = async () => {
            try {
                setCategories(await getCategories());
                console.log(categories[0])
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, [])

    return (
        <div className="all-categories-container">
            {categories.map(item => (
                <div className="categories-list">
                    <h3 key={item.id}>{item.name}</h3>

                </div>
            ))}
        </div>
    )

}

export default AllCategories;
