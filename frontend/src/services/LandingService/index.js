import axios from 'axios'
import {getParams, host} from "../CommonService";

export const getCategories = async () => {
    return (await axios.get(host + '/categories/')).data;
};

export const getSubcategories = async () => {
    return (await axios.get(host + '/subcategories/')).data;
};

export const getAllSubcategories = async () => {
    return (await axios.get(host + '/subcategories/all')).data;
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

export const getAllProducts = async (page, sort) => {
    return (await axios.get(host + '/product/search?page=' + page + '&sort=' + sort)).data;
};

export const getAllProductsByCategoryAndSubcategory = async (query, subcategory, minPrice, maxPrice, page, sort) => {
    return (await axios.get(host + '/product/category/', getParams({query, subcategory, minPrice, maxPrice, page, sort}))).data;
};
export const categoriesRouting = (history, category) => {
    history.push(`/shop/${category.name.toLowerCase()}`);
}
