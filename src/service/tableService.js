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
    // const reqData = new Map()
    // reqData.set("name", "zhangsan")
    // reqData.set("age", 1)
    // console.log("map:", reqData)
    // console.log("map string:", JSON.stringify(reqData))
    // console.log("execute _mapToJson", _mapToJson(reqData))
    // return axios.post('/vapi/getCodeTable', _mapToJson(reqData))


    const reqData = []
    reqData.push({id: "11"})
    reqData.push({age: 1})
    return axios.post('/vapi/getCodeTable', reqData)

}

/**
 * 将 map => obj
 * eg:{
 *  "id":1,
 *  "name":"zhangsan"
 *  } ==>
 *  {
 *      id:1
 *      name:zhangsan
 *  }
 */
const _strMapToObj = (strMap) => {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
/**
 * 将map转换为json格式字符串
 */
const _mapToJson = (map) => {
    return JSON.stringify(_strMapToObj(map));
}

