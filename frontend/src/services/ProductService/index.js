import axios from "axios";
import {getParams, host} from "../CommonService";

export const getProduct = async (id) => {
    return (await axios.get(host + '/product/', getParams({id}))).data;
};
