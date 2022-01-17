import React from 'react';
import {Form, FormControl, FormLabel, InputGroup} from 'react-bootstrap';
import moment from 'moment';
import * as yup from 'yup';
import {BirthDateForm} from '../BirthDateForm';
import "../forms.css";

export const requiredFormSchema = {
    firstName: yup.string()
        .min(2, "*First name must have at least 2 characters")
        .max(100, "*First name can't be longer than 100 characters")
        .required("*First name is required"),
    lastName: yup.string()
        .min(2, "*Last name must have at least 2 characters")
        .max(100, "*Last name can't be longer than 100 characters")
        .required("*Last name is required"),
    gender: yup.string()
        .required("*Gender is required")
        .test("gender-test", "*Gender is required", value => value === "MALE" || value === "FEMALE" || value === "OTHER"),
    day: yup.number()
        .typeError("*Day is required")
        .min(0, "*Day is required")
        .required("*Day is required"),
    month: yup.number()
        .typeError("*Month is required")
        .min(0, "*Month is required")
        .required("*Month is required"),
    year: yup.number()
        .typeError("*Year is required")
        .min(0, "*Year is required")
        .required("*Year is required"),
    phoneNumber: yup.string()
        .required("*Phone number is required")
        .test("digits-only", "*Phone number can only contain digits", value => /^\d*$/.test(value))
        .max(32, "*Phone number can't be longer than 32 characters"),
    email: yup.string()
        .email("*Email must be valid")
        .max(100, "*Email can't be longer than 100 characters")
        .required("*Email is required"),
    verified: yup.boolean(),
};

export const requiredFormInitialValues = (person) => {
    const age = person.birthDate !== undefined ? moment(person.birthDate) : null;
    return {
        firstName: person.firstName || "",
        lastName: person.lastName || "",
        gender: person.gender || "Gender",
        day: age !== null ? age.day() : -1,
        month: age !== null ? age.month() : -1,
        year: age !== null ? age.year() : -1,
        phoneNumber: person.phoneNumber || "",
        email: person.email || "",
        verified: person.verified || false
    };
};

const RequiredForm = ({handleChange, touched, errors, values, setFieldValue}) => {

    return (
        <div>
            <Form.Group>
                <Form.Label className="profile-page-input-fields">First name</Form.Label>
                <Form.Control
                    className="profile-page-input-field"
                    name="firstName"
                    defaultValue={values.firstName || ""}
                    placeholder="e.g. John"
                    onChange={handleChange}
                    maxLength={100}
                    isInvalid={touched.firstName && errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label className="profile-page-input-fields">Last name</Form.Label>
                <Form.Control
                    className="profile-page-input-field"
                    name="lastName"
                    defaultValue={values.lastName || ""}
                    placeholder="e.g. Doe"
                    onChange={handleChange}
                    maxLength={100}
                    isInvalid={touched.lastName && errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group style={{width: '50%'}}>
                <Form.Label className="profile-page-input-fields">I am</Form.Label>
                <Form.Control className="profile-page-gender-select"
                              defaultValue={values.gender || "Gender"}
                              name="gender"
                              onChange={handleChange}
                              as="select"
                              isInvalid={touched.gender && errors.gender}
                >
                    <option value="Gender" disabled hidden>Gender</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="MALE">MALE</option>
                    <option value="OTHER">OTHER</option>

                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors.gender}
                </Form.Control.Feedback>
            </Form.Group>

            <BirthDateForm handleChange={handleChange} touched={touched} values={values} errors={errors}
                           setFieldValue={setFieldValue}/>

            <InputGroup>
                <FormLabel className="profile-page-input-fields">Phone Number</FormLabel>
                <div className="phone-number-input-verify">
                    <FormControl
                        className="profile-page-phone-input-field"
                        name="phoneNumber"
                        defaultValue={values.phoneNumber || ""}
                        placeholder="e.g. 38761123456"
                        onChange={handleChange}
                        maxLength={32}
                        isInvalid={touched.phoneNumber && errors.phoneNumber}
                    />

                    <InputGroup.Text className="phone-number-verify-field">Not verified</InputGroup.Text>
                </div>
                <FormControl.Feedback type="invalid">
                    {errors.phoneNumber}
                </FormControl.Feedback>
            </InputGroup>
            <Form.Group>
                <Form.Label className="profile-page-input-fields">Email</Form.Label>
                <Form.Control
                    className="profile-page-input-field"
                    style={{marginBottom: 40}}
                    name="email"
                    type="email"
                    defaultValue={values.email || ""}
                    placeholder="e.g. example@mail.com"
                    onChange={handleChange}
                    maxLength={100}
                    isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
        </div>
    );
}

export default RequiredForm;
