import config from '@/api/config';

//获取token
export function getToken() {
  return localStorage.getItem(config.tokenKey)
}
//设置token
export function setToken() {
  return localStorage.setToken(config.tokenKey)
}