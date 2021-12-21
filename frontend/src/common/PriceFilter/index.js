import React, {useEffect, useState} from "react";

import './priceFilter.css';

import RangeSlider from 'rsuite/RangeSlider';
import "rsuite/dist/rsuite.min.css";


const PriceFilter = ({minPrice, maxPrice}) => {
    const [avg, setAvg] = useState();


    useEffect(() => {
        setAvg(((minPrice + maxPrice) / 2).toFixed(2))
    }, [minPrice, maxPrice])

    return (
        <div className="price-filter-container">
            <p className="price-range-filter-title"> Price Range</p>
            <div className="input-box-wrapper">
                <input className="first-input-box" placeholder={minPrice}/>
                <input className="second-input-box" placeholder={maxPrice}/>
            </div>

            <RangeSlider min={minPrice} max={maxPrice}/>

            <div className="price-range">
                {"$" + minPrice + "-$" + maxPrice}
            </div>
            <div className="price-range-average">
                The average price is ${avg}
            </div>
        </div>

    )
}

export default PriceFilter;