import axios from "axios";
import {getToken} from "../AuthService";

const config = {
    headers: {
        'Authorization': 'Bearer ' + getToken()
    }
};

export const getBidsForProduct = async (id) => {
    return (await axios.get('http://localhost:8080' + '/bids/product/?id=' + id)).data;
};

export const postBidForProduct = async (bidAmount, productId) => {
    return (await axios.post('http://localhost:8080' + '/bids/add', {bidAmount, productId}, config)).data;
};