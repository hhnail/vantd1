import axios from "axios";

/**
 * 保存自由报表
 */
export function saveFreeReport(data) {
    return axios.post('/vapi/saveFreeReport', data)
}