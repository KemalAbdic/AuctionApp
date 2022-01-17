import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import {countries} from '../../../services/CommonService';
import * as yup from 'yup';
import "../forms.css";

export const optionalFormSchema = {
    street: yup.string()
        .max(255, "*Street can't be longer than 255 characters"),
    city: yup.string()
        .max(255, "*City can't be longer than 255 characters"),
    zipCode: yup.string()
        .max(32, "*Zip can't be longer than 32 characters"),
    state: yup.string()
        .max(255, "*State can't be longer than 255 characters"),
    country: yup.string()
        .max(255, "*Country can't be longer than 255 characters"),
};

export const optionalFormInitialValues = (person) => {
    return {
        street: person.street || "",
        country: person.country || "",
        city: person.city || "",
        state: person.state || "",
        zipCode: person.zipCode || "",
    };
};

const OptionalForm = ({handleChange, touched, errors, values}) => {

    const [country, setCountry] = useState(values.country || "Select Country");

    return (
        <div>
            <Form.Group style={{marginTop: 24}}>
                <Form.Label>Street</Form.Label>
                <Form.Control
                    className="profile-page-input-field"
                    name="street"
                    defaultValue={values.street || ""}
                    placeholder="e.g. Indire Pjanić"
                    onChange={handleChange}
                    maxLength={255}
                    isInvalid={touched.street && errors.street}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.street}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="city-zip-container">
                <Form.Group className="city-container">
                    <Form.Label>City</Form.Label>
                    <Form.Control className="city-input"
                                  name="city"
                                  defaultValue={values.city || ""}
                                  placeholder="e.g. Cazin"
                                  onChange={handleChange}
                                  maxLength={32}
                                  isInvalid={touched.city && errors.city}
                    >

                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.city}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="zip-container" style={{marginLeft: 20}}
                >
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control className="zip-input"
                                  name="zipCode"
                                  defaultValue={values.zipCode || ""}
                                  placeholder="e.g. 77220"
                                  onChange={handleChange}
                                  maxLength={32}
                                  isInvalid={touched.zipCode && errors.zipCode}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.zip}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Group>

            <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control className="profile-page-input-field"
                              name="state"
                              defaultValue={values.state || ""}
                              placeholder="e.g. FBiH"
                              onChange={handleChange}
                              maxLength={255}
                              isInvalid={touched.state && errors.state}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.state}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="country">
                <Form.Label>Country</Form.Label>
                <Form.Control className="country-select"
                              value={country}
                              name="country"
                              onChange={(e) => {
                                  setCountry(e.target.value);
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
        </div>
    );
}

export default OptionalForm;
