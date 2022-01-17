import axios from 'axios';
import {host} from "../CommonService";
import {config} from "../BidService";

export const getCard = async () => {
    return (await axios.get(host + '/cards/person', config())).data;
};
