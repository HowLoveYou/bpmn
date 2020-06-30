import api from '@/api/index.js'

// 测试mock 登录
let login = (params) => api.post('/api/user/login', params);

export default {
  login
}