import router from './router'
import axios from 'axios'

axios.interceptors.request.use(
    config => {
    	const token = JSON.parse(localStorage.getItem("tokens"));
        if (token) {
            config.headers.Authorization = token.token_type + ' ' + token.access_token;
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
        return response;
    },
    error => {
    	console.log(error)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    localStorage.removeItem("tokens");
				    localStorage.removeItem("userInfo");
				    let redirect_name = router.currentRoute.name;
				    if(redirect_name !== 'login'){				    	
				    	router.replace({
				    	    name: 'login',
				    	    query: {redirect: redirect_name},
				    	    params: { error : '登陆信息已过期，请重新登陆！' }
				    	})
				    }else{
				    	router.replace({
				    	    name: 'login',
				    	    params: { error : '登陆信息已过期，请重新登陆！' }
				    	})
				    }
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });
    
    
export default axios;