import axios from "axios";
// import {store} from '../redux/store'
// import {REDUXSTATE} from "../constants/redux";
import {message} from "antd";

// 设置请求根路径
// axios.defaults.baseURL=""

axios.interceptors.request.use(function (config) {
    console.log("发起请求!!")
    // store.dispatch({
    //     type: REDUXSTATE.CHANGE_ISLOADING.type,
    //     payload: true
    // })

    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IuW8oOS4iSIsInJvbGUiOiJhZG1pbiIsInN1YiI6ImFkbWluLXRlc3QiLCJleHAiOjE2NjczNjg3MzcsImp0aSI6IjIxODlkM2VhLTNhYTctNGNkYi1hNjZiLWNhYTQyNmUzYzFhNSJ9.d5W6h1Z-pIPnqGZMPPr-h4mCJsO5Gz7OLWrQ-fTzREU"
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    message.error('系统响应正常')
    // store.dispatch({
    //     type: REDUXSTATE.CHANGE_ISLOADING.type,
    //     payload: false
    // })
    return response;
}, function (error) {
    message.error('系统出现异常，请稍后重试！', error)
    // store.dispatch({
    //     type: REDUXSTATE.CHANGE_ISLOADING.type,
    //     payload: false
    // })
    return Promise.reject(error);
});