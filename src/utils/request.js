import axios from 'axios'
import { message } from 'ant-design-vue';

/** *********************************************************************** */
import { showLoading, hideLoading } from './loading';
/** *********************************************************************** */


const service = axios.create({
  timeout: 5000 // request timeout 请求后端接口，五秒内没有返回前端直接返回超时
})
service.interceptors.request.use(
  config => {
    showLoading();
    // 请求头
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}` || '';
    }

    //显示等待框

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    setTimeout(() => {
    //隐藏等待框
      hideLoading();
    }, 200);
    // 登录成功 token 过期统一返回登录页
    if (res.data.errno === -1) {
      if (res.data.message === '登录超时') {
        message.error("请求超时，请重新登录")
        window.location.href = '/';
        return
      }
    }
    return res
  },
  error => {
    //隐藏等待框
    hideLoading();

    message.error("网络开小差，请稍后再试")
    return Promise.reject(error)
  }
)

export default service