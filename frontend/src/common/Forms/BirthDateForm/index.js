import React from 'react';
import {Form} from 'react-bootstrap';
import {getArrayOfDaysInMonth, getDaysInMonth, getMonths, getPastYears} from '../../../services/DateTimeService';
import "../forms.css";

export const BirthDateForm = ({handleChange, touched, values, errors, setFieldValue}) => (
    <Form.Group>
        <Form.Label className="profile-page-input-fields">Date of Birth</Form.Label>
        <div className="profile-page-date-fields" style={{marginBottom: 0}}>

            <Form.Control className="profile-page-date-select"
                          defaultValue={values.day || -1}
                          name="day"
                          onChange={handleChange}
                          as="select"
                          isInvalid={touched.day && errors.day}
            >
                <option value={-1} disabled hidden>DD</option>
                {getArrayOfDaysInMonth(parseInt(values.month) + 1, values.year).map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </Form.Control>

            <Form.Control className="profile-page-date-select"
                          defaultValue={values.month || -1}
                          name="month"
                          onChange={(e) => {
                              if (getDaysInMonth(parseInt(e.target.value) + 1, values.year) < values.day)
                                  setFieldValue("day", "1");
                              handleChange(e);
                          }}
                          as="select"
                          isInvalid={touched.month && errors.month}

            >
                <option value={-1} disabled hidden>MM</option>
                {getMonths().map((month, i) => (
                    <option key={month} value={i}>{month}</option>
                ))}
            </Form.Control>

            <Form.Control className="profile-page-date-select"
                          defaultValue={values.year || -1}
                          name="year"
                          onChange={(e) => {
                              if (getDaysInMonth(parseInt(values.month) + 1, e.target.value) < values.day)
                                  setFieldValue("day", "1");
                              handleChange(e);
                          }}
                          as="select"
                          isInvalid={touched.year && errors.year}
            >
                <option value={-1} disabled hidden>YY</option>
                {getPastYears(100).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </Form.Control>
        </div>
        <div className="form-errors">
            <div style={{marginRight: 89}}>
                <Form.Control.Feedback className={touched.day && errors.day ? "d-block" : null} type="invalid">
                    {errors.day}
                </Form.Control.Feedback>
            </div>
            <div style={{marginRight: 77}}>
                <Form.Control.Feedback className={touched.month && errors.month ? "d-block" : null} type="invalid">
                    {errors.month}
                </Form.Control.Feedback>
            </div>
            <div>
                <Form.Control.Feedback className={touched.year && errors.year ? "d-block" : null} type="invalid">
                    {errors.year}
                </Form.Control.Feedback>
            </div>
        </div>
    </Form.Group>
)
