import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Image} from "react-bootstrap";
import "./profile.css";
import {getPerson, setSession, updatePerson} from "../../../services/AuthService";
import {toBase64, uploadImage} from "../../../services/CommonService";
import {Formik} from 'formik';
import * as yup from 'yup';
import {getDate} from "../../../services/DateTimeService";

import {getCard} from "../../../services/CardService";
import {alertService} from "../../../services/AlertService";
import RequiredForm, {requiredFormInitialValues, requiredFormSchema} from "../../Forms/RequiredForm";
import CardForm, {cardFormInitialValues, cardFormSchema} from "../../Forms/CardForm";
import OptionalForm, {optionalFormInitialValues, optionalFormSchema} from "../../Forms/OptionalForm";
import {ChevronRight} from "akar-icons";


const Profile = () => {


    const person = getPerson();
    const inputFile = useRef(null);
    const [imageSource, setImageSource] = useState(person.person !== undefined ? person.person.pictureUrl : person.pictureUrl);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [card, setCard] = useState({});
    const [blankCard, setBlankCard] = useState(true);
    const options = {autoClose: true};


    useEffect(() => {
        const fetchData = async () => {
            try {
                setCard(await getCard());
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, [])

    const schema = yup.object().shape({
        ...requiredFormSchema,
        card: cardFormSchema(blankCard, card.cardNumber)
            .test("card-empty", "", card => {
                setBlankCard(Object.keys(card).every(prop => card[prop] === undefined));
                return true;
            }),
        ...optionalFormSchema
    });

    const deleteProperties = (personData) => {
        delete personData.day;
        delete personData.month;
        delete personData.year;
        if (blankCard)
            delete personData.card;
    }
    const handleSubmit = async (data) => {
        setUploading(false);
        const personData = {...data};
        personData.birthDate = getDate(data.day, data.month, data.year).toISOString();
        deleteProperties(personData);
        try {
            setUploading(true)
            if (imageFile !== null)

                personData.pictureUrl = await uploadImage(imageFile);
            const newPerson = await updatePerson(personData);
            setSession(newPerson, newPerson.token)
            window.scrollTo(0, 0);
            alertService.success('Your profile has been updated successfully!', options)
        } catch (e) {
            console.error(e)
        }
        setUploading(false);
    }

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        const imageType = /^image\/.*$/;
        if (imageType.test(file.type)) {
            setLoading(true);
            setImageFile(file);
            setImageSource(await toBase64(file));
            setLoading(false);
        }
    }

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                ...requiredFormInitialValues(person.person),
                card: cardFormInitialValues(card),
                ...optionalFormInitialValues(person.person)
            }}
            onSubmit={handleSubmit}
        >
            {({
                  handleSubmit,
                  handleChange,
                  touched,
                  errors,
                  values,
                  setFieldValue
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <div className="profile-tab-container">
                        <div className="profile-tab-title">
                            REQUIRED
                        </div>
                        <div className="profile-tab-content">
                            <div className="profile-tab-picture">
                                <Image className="profile-picture"
                                       src={imageSource}/>
                                <Button
                                    className="profile-tab-upload-button"
                                    onClick={() => inputFile.current.click()}
                                    disabled={loading}
                                >
                                    {loading ? "Loading" : "Change photo"}
                                </Button>
                                <input onChange={uploadFile} accept="image/*" type="file" ref={inputFile}
                                       style={{display: 'none'}}/>
                            </div>

                            <div className="profile-tab-form">
                                <RequiredForm
                                    handleChange={handleChange}
                                    touched={touched}
                                    errors={errors}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="profile-tab-container">
                        <div className="profile-tab-title">
                            CARD INFORMATION
                        </div>
                        <div className="profile-tab-content">
                            <div className="profile-tab-picture"/>
                            <div className="profile-tab-form">
                                <CardForm
                                    card={card}
                                    handleChange={handleChange}
                                    touched={touched}
                                    errors={errors}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="profile-tab-container">
                        <div className="profile-tab-title">
                            OPTIONAL
                        </div>
                        <div className="profile-tab-content">
                            <div className="profile-tab-picture"/>

                            <div className="profile-tab-form">
                                <OptionalForm
                                    handleChange={handleChange}
                                    touched={touched}
                                    errors={errors}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        style={{width: 243, marginBottom: 250}}
                        className="profile-tab-save-button"
                        type="submit"
                        disabled={uploading}
                    >
                        {uploading ? (
                            <div>
                                SAVING
                            </div>
                        ) : (
                            <div>
                                SAVE INFO
                                <ChevronRight style={{height: 18, width: 18, marginLeft: 15, paddingTop: 5}}/>
                            </div>
                        )}
                    </Button>
                </Form>
            )
            }
        </Formik>
    );

}

export default Profile
