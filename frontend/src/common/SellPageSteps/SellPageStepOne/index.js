import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import * as yup from 'yup';
import {Formik} from 'formik';
import './sellPageStepOne.css'
import {Form} from "react-bootstrap";
import Dropzone from '../../Dropzone/index'
import SellPageButton from "../SellPageButton";
import {uploadImage} from "../../../services/CommonService";

const SellPageStepOne = ({
                             categories: suppliedCategories,
                             subcategories: suppliedSubcategories,
                             selectCategory,
                             product,
                             setProduct,
                             setActiveTab
                         }) => {

    const [categories, setCategories] = useState(suppliedCategories);
    const [subcategories, setSubcategories] = useState(suppliedSubcategories);
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [pictures, setPictures] = useState(product.pictures || []);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setCategories(suppliedCategories);
    }, [suppliedCategories])

    useEffect(() => {
        setSubcategories(suppliedSubcategories);
    }, [suppliedSubcategories])

    const schema = yup.object().shape({
        name: yup.string()
            .required("*Product name is required")
            .min(5, "*Product name must be more than 5 characters")
            .max(60, "*Product name must be less than 60 characters"),
        category: yup.string()
            .notOneOf(["Select Category"], "*Category is required"),
        subcategory: yup.string()
            .notOneOf(["Select Subcategory"], "*Subcategory is required"),
        description: yup.string()
            .required("*Description is required")
            .max(700, "*Product description must be less than 700 characters"),
    });

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map(file => {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPictures(prevState => [
                    ...prevState,
                    {src: e.target.result, file}
                ]);
            };
            reader.readAsDataURL(file);
            return file;
        });
    }, []);

    const handleSubmit = async (data) => {
        setLoading(true);
        try {
            const newPictures = await Promise.all(pictures.map(async (picture) => {
                if (picture.url !== undefined)
                    return picture.url;
                setUploading(true);
                picture.url = await uploadImage(picture.file);
                return picture.url;
            }));
            setPictures(newPictures);
            setLoading(false);
            setProduct({...product, ...data, pictures: newPictures});
            setActiveTab(1);
        } catch (e) {
            setLoading(false);
        }
    }

    return (
        <div className="step-one-wrapper">
            <div className="step-one-container">
                <div className="step-one-title"> ADD ITEM</div>
                <div className="step-one-form">
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            name: product.name || "",
                            categoryId: product.categoryId || "Select Category",
                            subcategoryId: product.subcategoryId || "Select Subcategory",
                            description: product.description || "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              touched,
                              errors,
                              setFieldValue
                          }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="step-one-form-name">
                                    <Form.Label className="step-one-form-name-title">What do you sell?</Form.Label>
                                    <Form.Control
                                        className="step-one-form-name-input"
                                        name="name"
                                        defaultValue={product.name || ""}
                                        onChange={e => {
                                            handleChange(e);
                                        }}
                                        maxLength={60}
                                        isInvalid={touched.name && errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="step-one-form-select">
                                    <Form.Group className="step-one-form-select-category">
                                        <Form.Control className="step-one-form-select-dropdown"
                                                      defaultValue={product.categoryId || "Select Category"}
                                                      name="categoryId"
                                                      onChange={e => {
                                                          setFieldValue("subcategoryId", "Select Subcategory");
                                                          selectCategory(e, handleChange);
                                                      }}
                                                      as="select"
                                                      isInvalid={touched.categoryId && errors.categoryId}
                                        >
                                            <option value="Select Category" disabled hidden>Select Category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.categoryId}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="step-one-form-select-subcategory">
                                        <Form.Control className="step-one-form-select-dropdown"
                                                      defaultValue={product.subcategoryId || "Select Subcategory"}
                                                      name="subcategoryId"
                                                      onChange={handleChange}
                                                      as="select"
                                                      isInvalid={touched.subcategoryId && errors.subcategoryId}
                                        >
                                            <option value="Select Subcategory" disabled hidden>Select Subcategory
                                            </option>
                                            {subcategories.map(subcategory => (
                                                <option key={subcategory.id}
                                                        value={subcategory.id}>{subcategory.name}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.subcategoryId}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group className="description-container">
                                    <Form.Label>Description</Form.Label>
                                    <div className="text-area">
                                        <Form.Control
                                            as="textarea"
                                            className="text-area-input"
                                            name="description"
                                            defaultValue={product.description || ""}
                                            onChange={e => {
                                                handleChange(e);
                                                setDescriptionLength(e.target.value.length);
                                            }}
                                            isInvalid={touched.description && errors.description}
                                            maxLength={700}
                                            rows={5}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>
                                        <Form.Text className="form-control-description">100 words
                                            ({700 - descriptionLength} characters)</Form.Text>
                                    </div>
                                </Form.Group>
                                <Dropzone onDrop={onDrop} accept={"image/*"} images={pictures} setImages={setPictures}/>
                                <SellPageButton onBack={() => history.push('/profile/seller')}
                                                loading={loading}
                                                uploading={uploading}/>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>

        </div>
    )

}

export default SellPageStepOne
