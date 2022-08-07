import axios from "axios";
import qs from 'qs'
import {request, REQUEST_TYPE} from "../util/requestUtil";

/**
 * 获取头部菜单
 */
export function getHeaderMenu() {
    return axios.post('/vapi/getHeaderMenu')
}


/**
 * 获取模块信息
 */
export function getModule() {
    return axios.post('/vapi/getModule')
}

/**
 * 获取侧边栏
 */
export function getSidebar(pid) {
    return axios.post('/vapi/getSidebar',
        qs.stringify({
            pid: pid
        })
    )
}

/**
 * 新增模块
 */
export function addModule(data) {
    return axios.post('/vapi/addModule', data)
}

/**
 * 编辑模块
 */
export function updateModule(data) {
    return axios.post('/vapi/updateModule', data)
}

/**
 * 删除模块
 */
export function deleteModule(id) {
    return axios.post('/vapi/deleteModule', qs.stringify({id: id}))
}

/**
 * 获取表
 */
export function getTables() {
    return axios.post('/vapi/getTables')
}

/**
 * 获取表分组
 */
export function getTableGroup() {
    return axios.post('/vapi/getTableGroup')
}


/**
 * 获取角色分组
 */
export function getRoleGroup() {
    return request("/vapi/getRoleGroup", REQUEST_TYPE.POST)
}

/**
 *
 */
export function test() {
    return request("/vapi/test", REQUEST_TYPE.POST)
}






