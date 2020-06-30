import Mock from 'mockjs'

Mock.setup({
  timeout: '100-500'
});

Mock.mock(/\/api\/user\/login/, 'post', req => {
  return {
    code: 200,
    data: '已登录'
  }
})
export default Mock;