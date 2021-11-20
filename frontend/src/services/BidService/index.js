import axios from "axios";
import {getToken} from "../AuthService";
import {host} from "../CommonService";


const config = {
    headers: {
        'Authorization': 'Bearer ' + getToken()
    }
};

export const getBidsForProduct = async (id) => {
    return (await axios.get(host + '/bids/product/?id=' + id)).data;
};

export const postBidForProduct = async (bidAmount, productId) => {
    return (await axios.post(host + '/bids/add', {bidAmount, productId}, config)).data;
};