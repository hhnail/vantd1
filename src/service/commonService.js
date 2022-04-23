import axios from "axios";

/**
 * 获取头部菜单
 */
export function getHeaderMenu(){
    return axios.post('/vapi/getHeaderMenu')
}


/**
 * 获取模块信息
 */
export function getModuleInfo(){
    return axios.post('/vapi/getModule')
}

