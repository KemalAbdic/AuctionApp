import axios from 'axios'
import {host} from "../CommonService";

export const getCategories = async () => {
    return (await axios.get(host + '/categories/')).data;
};

export const getSubcategories = async () => {
    return (await axios.get(host + '/subcategories/')).data;
};

export const getRandomProduct = async () => {
    return (await axios.get(host + '/product/random')).data;
};

export const getNewProducts = async () => {
    return (await axios.get(host + '/product/new')).data;
};

export const getLastProducts = async () => {
    return (await axios.get(host + '/product/last')).data;
};

export const categoriesRouting = (history, category) => {
    history.push(`/shop/${category.name.split(' ').join('_').toLowerCase()}/`);
}