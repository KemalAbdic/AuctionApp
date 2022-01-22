import axios from "axios";
import {getParams, host} from "../CommonService";
import {config} from "../BidService";

export const getProduct = async (id) => {
    return (await axios.get(host + '/product/', getParams({id}))).data;
};

export const getPersonBidsForProducts = async () => {
    return (await axios.get(host + '/product/person/bids', config())).data;
};

export const getPersonSellProducts = async () => {
    return (await axios.get(host + '/product/person/', config())).data;
};

export const addProduct = async (product) => {
    return (await axios.post(host + '/product/add', {...product}, config())).data;
};

export const productUrl = (product) => {
    return `/shop/${product.categoryName.toLowerCase()}/${product.subcategoryName.toLowerCase()}/${product.id}`
}