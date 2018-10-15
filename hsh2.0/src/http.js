// import router from './router';
import axios from 'axios';

axios.interceptors.request.use(
    config => {
        // console.log('提交请求成功')
        const token = JSON.parse(localStorage.getItem("tokens"));
        if (token) {
            config.headers.Authorization = 'Bearer ' + token.access_token;
        }
        return config;
    },
    err => {
    	console.log(err)
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // console.log('请求响应成功')
        return response;
    },
    error => {
    	console.log(error)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 token过期 清除token信息
                    // localStorage.removeItem("tokens");
                    break;
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        // return Promise.reject(error.response.data)
    });
    
    
export default axios;