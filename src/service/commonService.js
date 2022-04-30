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
export function getModule(){
    return axios.post('/vapi/getModule')
}

/**
 * 获取侧边栏
 */
export function getSidebar(){
    return axios.post('/vapi/getSidebar')
}

/**
 * 新增模块
 */
export function addModule(data){
    return axios.post('/vapi/addModule',data)
}

/**
 * 删除模块
 */
export function deleteModule(id){
    return axios.post('/vapi/deleteModule',id)
}

/**
 * 获取表
 */
export function getTables(){
    return axios.post('/vapi/getTables')
}




