import axios from 'axios';

const instance = axios.create({
  baseURL: '',
  timeout: 10000,
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 登录失效状态返回在401
    if (response.data?.code === 401) {
      // window.location.reload();
      return Promise.reject(response)
    }
    // 返回全部响应体
    if (response.config.headers.allData) {
      return response;
    } else {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
