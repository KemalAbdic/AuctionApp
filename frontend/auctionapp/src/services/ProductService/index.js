import axios from "axios";
import {getParams} from "../CommonService";

export const getProduct = async (id) => {
    return (await axios.get('http://localhost:8080' + '/product/', getParams({id}))).data;
};