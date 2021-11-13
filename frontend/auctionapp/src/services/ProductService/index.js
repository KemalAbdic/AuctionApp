import axios from "axios";

export const getParams = (args) => {
    return {
        params: {
            ...args
        }
    };
}

export const getProduct = async (id) => {
    return (await axios.get('http://localhost:8080' + '/product/', getParams({id}))).data;
};