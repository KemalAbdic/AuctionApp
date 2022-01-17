import axios from "axios";
import {host} from "../CommonService";
import {config} from "../BidService";

export const register = async (person) => {
    return (await axios.post(host + "/auth/register", person)).data;
};

export const login = async (person) => {
    return (await axios.post(host + "/auth/login", person)).data;
};

export const setSession = (person, token) => {
    localStorage.setItem('current-token', token);
    localStorage.setItem('current-user', JSON.stringify(person));
}

export const removeSession = () => {
    localStorage.removeItem('current-token');
    localStorage.removeItem('current-user');
};

export const getToken = () => {
    return localStorage.getItem('current-token') || null;
}

export const getPerson = () => {
    const person = localStorage.getItem('current-user');
    if (person) return JSON.parse(person);
    else return null;
}

export const setPerson = (user) => {
    localStorage.setItem("current-user", JSON.stringify(user));
};


export const loggedIn = () => {
    return getPerson() != null;
}

export const setPersonCredentials = (email, password) => {
    localStorage.setItem('current-email', email);
    localStorage.setItem('current-password', password);
}

export const getPersonCredentials = () => {
    let email = localStorage.getItem('current-email');
    let password = localStorage.getItem('current-password');
    return {email, password};
}

export const removePersonCredentials = () => {
    localStorage.removeItem('current-email');
    localStorage.removeItem('current-password');
}

export const getPersonId = () => {
    const person = localStorage.getItem('current-user');
    return person ? JSON.parse(person).person.id : null;
};

export const updatePerson = async (user) => {
    return (await axios.put(host + '/auth/update', user, config())).data;
};
