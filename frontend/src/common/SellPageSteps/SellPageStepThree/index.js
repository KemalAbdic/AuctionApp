import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import * as yup from 'yup';
import {Formik} from 'formik';
import {useHistory} from "react-router-dom";
import {countries} from "../../../services/CommonService";
import SellPageButton from "../SellPageButton";
import {getPerson} from "../../../services/AuthService";
import './sellPageStepThree.css'
import {productUrl} from "../../../services/ProductService";

const SellPageStepThree = ({product, setProduct, setActiveTab, handleDone}) => {
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    let user = getPerson().person

    const schema = yup.object().shape({
        street: yup.string()
            .required("*Address is required")
            .max(255, "*Address can't be longer than 255 characters"),
        country: yup.string()
            .required("*Country is required")
            .max(255, "*Country can't be longer than 255 characters"),
        city: yup.string()
            .required("*City is required")
            .max(255, "*City can't be longer than 255 characters"),
        zipCode: yup.string()
            .required("*Zip is required")
            .max(32, "*Zip can't be longer than 32 characters"),
        phoneNumber: yup.string()
            .required("*Phone number is required")
            .max(32, "*Phone can't be longer than 32 characters")
            .test("digits-only", "*Phone number can only contain digits", value => /^\d*$/.test(value))

    });

    const saveData = (data) => {
        const newData = {...product, ...data};
        setProduct(newData);
        return newData;
    }

    const handleSubmit = async (data) => {
        const newData = saveData(data);
        setLoading(true);
        const newProduct = await handleDone(newData);
        if (newProduct === null || undefined)
            setLoading(false);
        else
            history.push(productUrl(newProduct))
    }

    return (
        <div className="step-three-wrapper">
            <div className="step-three-container">
                <div className="step-three-title">
                    LOCATION & SHIPPING
                </div>
                <div className="step-three-form">
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            street: user.street || "",
                            country: user.country || "",
                            city: user.city || "",
                            zipCode: user.zipCode || "",
                            phoneNumber: user.phoneNumber || "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              touched,
                              errors,
                              values
                          }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="step-three-form-street">
                                    <Form.Label className="step-three-form-title">Address</Form.Label>
                                    <Form.Control
                                        className="step-three-form-street-input"
                                        name="street"
                                        defaultValue={user.street || ""}
                                        placeholder="e.g. Indire Pjanić"
                                        onChange={handleChange}
                                        maxLength={255}
                                        isInvalid={touched.street && errors.street}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.street}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="step-three-city-country">
                                    <Form.Group style={{marginRight: 24}}>
                                        <Form.Control className="city-country-input"
                                                      defaultValue={user.city || "Enter City"}
                                                      name="city"
                                                      onChange={handleChange}
                                                      isInvalid={touched.city && errors.city}
                                        >
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.city}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Control className="city-country-input"
                                                      defaultValue={user.country || "Select Country"}
                                                      name="country"
                                                      onChange={(e) => {
                                                          handleChange(e);
                                                      }}
                                                      as="select"
                                                      isInvalid={touched.country && errors.country}
                                        >
                                            <option value="Select Country" disabled hidden>Select Country</option>
                                            {countries.map(country => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.country}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group className="step-three-form-street">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                        className="step-three-form-street-input"
                                        name="zipCode"
                                        defaultValue={user.zipCode || ""}
                                        placeholder="e.g. 77220"
                                        onChange={handleChange}
                                        maxLength={32}
                                        isInvalid={touched.zip && errors.zip}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.zipCode}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="step-three-form-street" style={{marginTop: 32}}>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        className="step-three-form-street-input"
                                        name="phoneNumber"
                                        defaultValue={user.phoneNumber || ""}
                                        placeholder="e.g. 0038761123456"
                                        onChange={handleChange}
                                        maxLength={100}
                                        isInvalid={touched.phoneNumber && errors.phoneNumber}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phoneNumber}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <SellPageButton
                                    onBack={() => {
                                        saveData(values);
                                        setActiveTab(1);
                                    }}
                                    lastStep={true}
                                    loading={loading}
                                />
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default SellPageStepThree
