import axios from "axios";
import qs from "qs";

export const createTable = (data) => {
    return axios.post('/vapi/createTable', data)
}


export const updateTable = (data) => {
    return axios.post('/vapi/updateTable', data)
}

export const getTableColumns = (id) => {
    return axios.post('/vapi/getTableColumns',
        qs.stringify({
            id: id
        })
    )
}


/**
 * 获取编码表
 */
export const getCodeTable = (type) => {
    return axios.post('/vapi/getCodeTable',
        qs.stringify({
            type: type
        })
    )
}

