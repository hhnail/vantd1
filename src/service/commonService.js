import axios from "axios";

export function getHeaderMenu(){
    return axios.post('/vapi/getHeaderMenu')
}