import axios from "axios";
import qs from 'qs'
/**
 * 保存自由报表
 */
export function saveFreeReport(data) {
    return axios.post('/vapi/saveFreeReport', data)
}

/**
 * 获取自由报表
 */
export function getFreeReport(id) {
    return axios.post('/vapi/getFreeReport', qs.stringify({id: id}))
}