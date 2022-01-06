import React, {useEffect, useState} from "react";

import './priceFilter.css';
import "rsuite/dist/rsuite.min.css";
import {Slider} from "@material-ui/core";

const PriceFilter = ({prices, priceRange, setPriceRange, handleClick}) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(400);
    const [avgPrice, setAvgPrice] = useState(0);

    useEffect(() => {
        setPriceRange({
            min: 0,
            max: 400
        });
        setAvgPrice(((priceRange.min + priceRange.max) / 2).toFixed(2));
        // eslint-disable-next-line
        }, [setMinPrice, setMaxPrice])

    useEffect(() => {
        setAvgPrice(((priceRange.min + priceRange.max) / 2).toFixed(2));
    }, [priceRange])

    const onSliderChange = (e, newValues) => {
        setPriceRange({
            min: newValues[0],
            max: newValues[1]
        });
        handleClick({minPrice: priceRange.min, maxPrice: priceRange.max})
    }

    const handleMinInputBoxChange = (e) => {
        setPriceRange({
            min: e.target.value,
            max: priceRange.max
        });
        handleClick({minPrice: priceRange.min, maxPrice: priceRange.max})
    }

    const handleMaxInputBoxChange = (e) => {
        setPriceRange({
            min: priceRange.min,
            max: e.target.value
        });
        handleClick({minPrice: priceRange.min, maxPrice: priceRange.max})
    }

    return (
        <div className="price-filter-container">
            <p className="price-range-filter-title"> Price Range</p>

            <div className="input-box-wrapper">
                <input className="first-input-box" placeholder={priceRange.min} onChange={handleMinInputBoxChange}/>
                <input className="second-input-box" placeholder={priceRange.max} onChange={handleMaxInputBoxChange}/>
            </div>
            <div className="histogram-container">
                {prices.map((count, i) => (
                    <div
                        key={i}
                        className="histogram-bar"
                        style={{ width: 'calc(100% / ' + prices.length + ')', height: count === 0 ? 0 : 'calc(80px / ' + (400 / count) + ')' }}
                    />
                ))}
            </div>
            <Slider
                min={minPrice}
                max={maxPrice}
                value={[priceRange.min, priceRange.max]}
                step={1}
                onChange={onSliderChange}
            />
            <div className="price-range">
                {"$" + priceRange.min + "-$" + priceRange.max}
            </div>
            <div className="price-range-average">
                The average price is ${avgPrice}
            </div>
        </div>
    )
}

export default PriceFilter;
