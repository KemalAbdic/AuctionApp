import axios from "axios";

export const getParams = (args) => {
    return {
        params: {
            ...args
        }
    };
}

export const getBidsForProduct = async (id) => {
    return (await axios.get('http://localhost:8080' + '/bids/product/?id=' + id)).data;
};
