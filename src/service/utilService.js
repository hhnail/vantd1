import axios from "axios";
import qs from "qs";

/**
 * 翻译
 */
export function translate(chinese) {
    return axios.post('/vapi/translate',
        qs.stringify({
        chineseStr: chinese
    }))
}
