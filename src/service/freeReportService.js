import axios from "axios";
import qs from 'qs'
/**
 * 保存自由报表
 */
export function saveFreeReport(data) {
    return axios.post('/vapi/saveFreeReport', data)
}

/**
 * 查询自由报表列表
 */
export function getFreeReportList() {
    return axios.post('/vapi/getFreeReportList')
}

/**
 * 获取自由报表
 */
export function getFreeReport(id) {
    return axios.post('/vapi/getFreeReport', qs.stringify({id: id}))
}