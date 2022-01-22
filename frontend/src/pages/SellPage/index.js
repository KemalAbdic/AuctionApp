import React, {useEffect, useState} from 'react';
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import SellPageStepOne from "../../common/SellPageSteps/SellPageStepOne";
import './sellPage.css'
import {Step, Stepper} from 'react-form-stepper';
import SellPageStepTwo from "../../common/SellPageSteps/SellPageStepTwo";
import SellPageStepThree from "../../common/SellPageSteps/SellPageStepThree";
import {addProduct} from "../../services/ProductService";
import {getCategories, getSubcategoriesForCategory} from "../../services/LandingService";

const SellPage = () => {

    const {setBreadcrumb} = useBreadcrumbContext();
    const [activeStep, setActiveStep] = useState(0);
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {

        setBreadcrumb("Become seller", [{text: "My account", href: "/profile"}, {text: "Become seller"}]);

        const fetchData = async () => {
            try {
                setCategories(await getCategories());
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [])


    const handleCategoryChange = async (e, handleCategoryChange) => {
        handleCategoryChange(e);
        setSubcategories([]);
        setSubcategories(await getSubcategoriesForCategory(e.target.value));
    }


    const handleDone = async (product) => {
        try {
            const id = await addProduct(product);
            const categoryName = categories.filter(category => category.id === parseInt(product.categoryId))[0].name;
            const subcategoryName = subcategories.filter(subcategory => subcategory.id === parseInt(product.subcategoryId))[0].name;
            return {
                id, categoryName, subcategoryName
            };
        } catch (e) {
            console.error(e);
        }
    }

    const sellPageSteps = [
        <SellPageStepOne categories={categories} subcategories={subcategories} selectCategory={handleCategoryChange}
                         product={product} setProduct={setProduct} setActiveTab={setActiveStep}/>,
        <SellPageStepTwo product={product} setProduct={setProduct} setActiveTab={setActiveStep}/>,
        <SellPageStepThree product={product} setProduct={setProduct} setActiveTab={setActiveStep} handleDone={handleDone}/>
    ];

    const renderStep = (active) => (
        <Step>
            <div className="white-circle">
                <div style={active ? {backgroundColor: '#8367D8'} : {backgroundColor: '#FFFFFF'}}
                     className="purple-circle"/>
            </div>
        </Step>
    )

    return (
        <div className="sell-page-wrapper">
            <div className="sell-page-stepper-container">
                <div><Stepper
                    activeStep={activeStep}
                    styleConfig={{
                        activeBgColor: '#fcfcfc',
                        circleFontSize: 0,
                        completedBgColor: '#fcfcfc',
                        inactiveBgColor: '#8367D8',
                        size: '28px'
                    }}
                    connectorStateColors={true}
                    connectorStyleConfig={{
                        activeColor: '#8367D8',
                        completedColor: '#8367D8',
                        disabledColor: '#D8D8D8',
                        size: '1px'
                    }}
                    className="sell-stepper"
                >
                    {renderStep(activeStep >= 0)}
                    {renderStep(activeStep >= 1)}
                    {renderStep(activeStep >= 2)}
                </Stepper></div>
                {sellPageSteps[activeStep]}
            </div>
        </div>

    )

}
export default SellPage
