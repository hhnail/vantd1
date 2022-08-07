import axios from "axios";
import qs from "qs";
import {QueryOption, queryOption} from "../util/QueryOption";
import {request, REQUEST_TYPE} from "../util/requestUtil";

export const createTable = (data) => {
    return axios.post('/vapi/createTable', data)
}


export const updateTable = (data) => {
    return axios.post('/vapi/updateTable', data)
}

/**
 * 根据表格的逻辑字段
 */
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

    const queryOption = new QueryOption();
    queryOption.addCondition(
        "type",
        [type],
        "EQUAL",
    )
    queryOption.setPrimaryTable("sys_table")
    console.log("options：", queryOption.getOption())
    return axios.post('/vapi/getCodeTable', queryOption.getOption())

}

/**
 * 添加字段
 */
export const addField = (data) => {
    return request('/vapi/addField', REQUEST_TYPE.POST, data)
}
