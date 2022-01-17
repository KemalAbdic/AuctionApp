import React, {useEffect, useState} from 'react';
import {getIn} from 'formik';
import {Form} from 'react-bootstrap';
import {getCurrentMonth, getCurrentYear, getMonth, getNextYears} from '../../../services/DateTimeService';
import * as yup from 'yup';
import "../forms.css";

export const cardFormSchema = (notRequired, initialCardNumber) => {
    return yup.object().shape({
        cardName: yup.string()
            .test("custom-required", "*Name is required", value => notRequired || value)
            .max(255, "*Name can't be longer than 255 characters"),
        cardNumber: yup.string()
            .test("custom-required", "*Card number is required", value => notRequired || value)
            .min(13, "*Card number must have at least 13 characters")
            .max(19, "*Card number can't be longer than 19 characters")
            .test("digits-only", "*Card number can only contain digits", value => notRequired || value === initialCardNumber || /^\d*$/.test(value)),
        expirationYear: yup.number()
            .test("custom-required", "*Expiration year is required", value => notRequired || value),
        expirationMonth: yup.number()
            .test("custom-required", "*Expiration month is required", value => notRequired || value),
        cvcNumber: yup.number()
            .typeError("*CVC must be a number")
            .test("custom-required", "*CVC is required", value => notRequired || value)
            .min(100, "*CVC must have at least 3 digits")
            .max(9999, "*CVC can't be longer than 4 digits")
    });
};

export const cardFormInitialValues = (card) => {
    return {
        cardName: card.cardName || "",
        cardNumber: card.cardNumber || "",
        expirationMonth: card.expirationMonth || "",
        expirationYear: card.expirationYear || "",
        cvcNumber: card.cvcNumber || ""
    };
};

const CardForm = ({
                      card,
                      handleChange,
                      touched,
                      errors,
                      setFieldValue
                  }) => {

    const [currentMonth, setCurrentMonth] = useState(0);
    const [expirationMonth, setExpirationMonth] = useState(card.expirationMonth || "MM");
    const [expirationYear, setExpirationYear] = useState(card.expirationYear || "YY");


    useEffect(() => {
        if (Object.keys(card).length === 0)
            return;
        setFieldValue("card.cardName", card.cardName);
        setFieldValue("card.cardNumber", card.cardNumber);
        setFieldValue("card.expirationMonth", card.expirationMonth);
        setFieldValue("card.expirationYear", card.expirationYear);
        setFieldValue("card.cvcNumber", card.cvcNumber);

        setExpirationMonth(card.expirationMonth);
        setExpirationYear(card.expirationYear);
    }, [card, setFieldValue])

    return (
        <div>
            <Form.Group>

                <Form.Group>
                    <Form.Label className="profile-page-input-fields">Name on the Card</Form.Label>

                    <Form.Control
                        className="profile-page-input-field"
                        name="card.cardName"
                        defaultValue={card.cardName || ""}
                        placeholder="e.g. John Doe"
                        onChange={handleChange}
                        onBlur={e => e.target.value === "" ? setFieldValue("card.cardName", "") : null}
                        maxLength={255}
                        isInvalid={getIn(touched, 'card.cardName') && getIn(errors, 'card.cardName')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {getIn(errors, 'card.cardName')}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label className="profile-page-input-fields">Card Number</Form.Label>
                    <Form.Control
                        className="profile-page-input-field"
                        name="card.cardNumber"
                        defaultValue={card.cardNumber || ""}
                        placeholder="e.g. 1234 5678 9876 5432"
                        onChange={handleChange}
                        onBlur={e => e.target.value === "" ? setFieldValue("card.cardNumber", "") : null}
                        maxLength={19}
                        isInvalid={getIn(touched, 'card.cardNumber') && getIn(errors, 'card.cardNumber')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {getIn(errors, 'card.cardNumber')}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Group>
            <Form.Group>
                <Form.Group className="card-data">
                    <Form.Group>
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Group className="card-data-expiration">
                            <Form.Group>
                                <Form.Control className="card-data-expiration-month"
                                              value={expirationMonth}
                                              name="card.expirationMonth"
                                              onChange={e => {
                                                  handleChange(e);
                                                  setExpirationMonth(e.target.value);
                                              }}
                                              as="select"
                                              isInvalid={getIn(touched, 'card.expirationMonth') && getIn(errors, 'card.expirationMonth')}
                                              style={expirationMonth !== "MM" ? {paddingRight: 66} : null}
                                >
                                    <option value="">MM</option>
                                    {[...Array(12 - currentMonth).keys()].map(x => (
                                        <option key={x}
                                                value={currentMonth + x + 1}>{getMonth(currentMonth + x)}</option>
                                    ))}
                                </Form.Control>

                            </Form.Group>
                            <Form.Control className="card-data-expiration-year"
                                          value={expirationYear}
                                          name="card.expirationYear"
                                          onChange={e => {
                                              setCurrentMonth(parseInt(e.target.value) === getCurrentYear() ? getCurrentMonth() : 0);
                                              handleChange(e);
                                              setExpirationYear(e.target.value);
                                          }}
                                          as="select"
                                          isInvalid={getIn(touched, 'card.expirationYear') && getIn(errors, 'card.expirationYear')}
                                          style={expirationYear !== "YY" ? {paddingRight: 66} : null}
                            >
                                <option value="">YY</option>
                                {getNextYears(10).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className="card-cvc">
                        <Form.Label>CVC/CVV</Form.Label>
                        <Form.Control className="card-cvc-input"
                                      name="card.cvcNumber"
                                      defaultValue={card.cvcNumber || ""}
                                      placeholder="e.g. 456"
                                      onChange={handleChange}
                                      onBlur={e => e.target.value === "" ? setFieldValue("card.cvcNumber", "") : null}
                                      maxLength={4}
                                      isInvalid={getIn(touched, 'card.cvcNumber') && getIn(errors, 'card.cvcNumber')}
                        />
                    </Form.Group>
                </Form.Group>

                <div className="form-errors">
                    <div style={{marginRight: 30}}>
                        <Form.Control.Feedback className="inline-feedback-error" type="invalid">
                            {getIn(errors, 'card.expirationMonth')}
                        </Form.Control.Feedback>
                    </div>
                    <div>
                        <Form.Control.Feedback className="inline-feedback-error" type="invalid">
                            {getIn(errors, 'card.expirationYear')}
                        </Form.Control.Feedback>
                    </div>
                    <div style={{marginLeft: 20}}>
                        <Form.Control.Feedback className="inline-feedback-error" type="invalid">
                            {getIn(errors, 'card.cvcNumber')}
                        </Form.Control.Feedback>
                    </div>
                </div>
            </Form.Group>

        </div>
    );
}

export default CardForm;
