import React, {useRef} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Form, FormControl, FormLabel, InputGroup} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import moment from "moment";
import SellPageButton from "../SellPageButton";
import './stepTwo.css'
import 'react-datepicker/dist/react-datepicker.css';
import {MdOutlineCalendarToday} from "react-icons/all";


const SellPageStepTwo = ({product, setProduct, setActiveTab}) => {

    const auctionEndRef = useRef(null);

    const schema = yup.object().shape({
        startingPrice: yup.number()
            .typeError("*Start price must be a number")
            .required("*Start price is required")
            .min(0.01, "*Start price can't be lower than $0.01")
            .max(999999.99, "*Start price can't be higher than $999999.99"),
        auctionStart: yup.string()
            .nullable()
            .required("*Start date is required"),
        auctionEnd: yup.string()
            .nullable()
            .required("*End date is required")
    });

    const saveData = (data) => {
        const newData = {...product, ...data};
        setProduct(newData);
    }

    const handleSubmit = (data) => {
        saveData(data);
        setActiveTab(2);
    }

    return (
        <div className="step-two-wrapper">
            <div className="step-two-container">
                <div className="step-two-title">SET PRICES</div>
                <div className="step-two-form">
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            startingPrice: product.startingPrice || "",
                            auctionStart: product.auctionStart || "",
                            auctionEnd: product.auctionEnd || ""
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              touched,
                              errors,
                              setFieldValue,
                              setFieldTouched,
                              values
                          }) => (
                            <Form noValidate onSubmit={(e) => {
                                handleSubmit(e);
                            }}>
                                <InputGroup>
                                    <FormLabel className="step-two-form-price-title">Your start price</FormLabel>
                                    <div className="step-two-form-price-input">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl
                                            className="price-input"
                                            name="startingPrice"
                                            defaultValue={product.startingPrice || ""}
                                            onChange={handleChange}
                                            maxLength={9}
                                            isInvalid={touched.startingPrice && errors.startingPrice}
                                        />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.startingPrice}
                                    </Form.Control.Feedback>
                                </InputGroup>

                                <Form.Group className="step-two-date-container">
                                    <Form.Group className="form-auction-start">
                                        <Form.Label>Start date</Form.Label>
                                        <div>
                                            <DatePicker
                                                className="auction-start"
                                                placeholderText="DD/MM/YYYY"
                                                dateFormat="dd/MM/yyyy"
                                                name="auctionStart"
                                                minDate={new Date()}
                                                selected={values.auctionStart}
                                                onChange={date => {
                                                    if (date === null) {
                                                        setFieldValue("auctionStart", date);
                                                        return;
                                                    }
                                                    setFieldValue("auctionStart", moment(date).isBefore(moment()) ? moment().toDate() : moment(date).startOf('day').toDate());
                                                    if (values.auctionEnd === null) {
                                                        auctionEndRef.current.setOpen(true);
                                                    } else if (!moment(values.auctionEnd).isAfter(date)) {
                                                        setFieldValue("auctionEnd", moment(date).endOf('day').toDate());
                                                        auctionEndRef.current.setOpen(true);
                                                    }
                                                }}
                                                useWeekdaysShort={true}
                                                onBlur={() => values.auctionStart !== null ? setFieldTouched("auctionStart", true) : null}
                                            />
                                            <MdOutlineCalendarToday className="calendar-icon"
                                                                    style={{top: -58, right: -220}}/>
                                        </div>
                                        <Form.Control.Feedback style={{marginTop: -40}}
                                                               className={touched.auctionStart && errors.auctionStart ? "d-block" : null}
                                                               type="invalid">
                                            {errors.auctionStart}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="form-auction-end">
                                        <Form.Label>End date</Form.Label>
                                        <div>
                                            <DatePicker
                                                className="auction-end"
                                                placeholderText="DD/MM/YYYY"
                                                dateFormat="dd/MM/yyyy"
                                                name="auctionEnd"
                                                minDate={values.auctionStart !== null ? moment(values.auctionStart).toDate() : moment().toDate()}
                                                selected={values.auctionEnd}
                                                onChange={date => setFieldValue("auctionEnd", moment(date).endOf('day').toDate())}
                                                useWeekdaysShort={true}
                                                ref={auctionEndRef}
                                                onBlur={() => values.auctionEnd !== null ? setFieldTouched("auctionEnd", true) : null}
                                            />
                                            <MdOutlineCalendarToday className="calendar-icon"
                                                                    style={{top: -58, right: -220}}/>
                                        </div>
                                        <Form.Control.Feedback style={{marginTop: -40}}
                                                               className={touched.auctionEnd && errors.auctionEnd ? "d-block" : null}
                                                               type="invalid">
                                            {errors.auctionEnd}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Group>
                                <div className="seller-bottom-text">The auction will be automatically closed when the
                                    end time comes. The highest bid will win the auction.
                                </div>
                                <SellPageButton onBack={() => {
                                    saveData(values);
                                    setActiveTab(0)
                                }}/>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )

}

export default SellPageStepTwo
