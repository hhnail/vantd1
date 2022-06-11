import axios from "axios";
import qs from "qs";

export const createTable = (data)=>{
    return axios.post('/vapi/createTable',data)
}


export const updateTable = (data)=>{
    return axios.post('/vapi/updateTable',data)
}

