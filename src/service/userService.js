import axios from "axios";

/**
 * 登录
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = (data) => {
    return axios.post('/vapi/login', data)
}