import axios from "axios";

export const register = async (user) => {
        return (await axios.post("http://localhost:8080/auth/register", user)).data;
    };

export const login = async (user) => {
        return (await axios.post("http://localhost:8080/auth/login", user)).data;
    };

export const setSession = (person, token) => {
    localStorage.setItem('current-token', token);
    localStorage.setItem('current-user', JSON.stringify(person));
}

export const removeSession = () => {
    localStorage.removeItem('current-token');
    localStorage.removeItem('current-user');
};

