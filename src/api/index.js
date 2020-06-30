import axios from 'axios'
import config from './config';
import {
  getToken
} from '@/utils/common.js'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

// 创建一个 axios 实例
const service = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000
})

// 请求header配置
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers[config.tokenKey] = getToken();
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

//请求响应（具体如何返回需要和后台进行商议）
service.interceptors.response.use(response => {
  console.log(response);
  const dataAxios = response.data; //后台返回的数据
  const {
    code,
  } = dataAxios;
  // 根据 code 进行判断
  if (code === undefined) {
    // 如果没有 code 则直接返回 dataAxios
    return dataAxios;
  } else {
    switch (code) {
      case 200:
        return dataAxios
      default:
        return Promise.reject(dataAxios);
    }
  }
}, error => {
  return Promise.reject(error);
})

export default service;