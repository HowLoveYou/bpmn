import router from './index.js';

const wliteList = ['/login', '/test']; //白名单

router.beforeEach((to, from, next) => {
  next();
  // let isLogin = localStorage.getItem('token');
  // if (isLogin) {
  //   if (to.path == '/login') {
  //     next({
  //       path: '/'
  //     })
  //   } else {
  //     next();
  //   }
  // } else {
  //   if (wliteList.includes(to.path)) {
  //     next();
  //   } else {
  //     next('/login')
  //   }
  // }
})