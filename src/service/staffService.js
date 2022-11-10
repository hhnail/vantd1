import {request, REQUEST_TYPE} from "../util/requestUtil";

/**
 * 获取员工列表
 */
export function getStaffList() {
    return request('/vapi/getStaffList', REQUEST_TYPE.POST)
}