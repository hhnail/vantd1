import axios from "axios";

/**
 * 请求类型
 */
export const REQUEST_TYPE = {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete",
    TRACE: "trace",
    HEAD: "head",
    OPTIONS: "options",
    CONNECT: "connect",
}


/**
 * 向后端发送请求
 * @param url 请求地址
 * @param type 请求类型
 * @param params 请求参数
 */
export const request = (url, type, params) => {
    if (!url) {
        console.error("url不得为空")
        throw "url不得为空"
        return
    }
    if (!type) {
        type = REQUEST_TYPE.GET
    }
    switch (type) {
        case REQUEST_TYPE.POST:
            return axios.post(url, params)
        case REQUEST_TYPE.GET:
            return axios.get(url)
        case REQUEST_TYPE.DELETE:
            return axios.delete(url)
        default:
            break
    }
}