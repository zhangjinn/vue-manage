// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios'
//import 'element-ui/lib/theme-chalk/index.css';//默认主题
import '@/element-ui-theme'
import '@/element-ui-theme'
import '../static/font/iconfont.css';
import '../static/css/main.less';

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });

/*
* 挂在全局
* */
//安装其他插件的时候，可以直接在 main.js 中引入并 Vue.use()，但是 axios 并不能 use.
//这时候如果在其它的组件中，是无法使用 axios 命令的。所以我们将 axios 改写为 Vue 的原型属性
Vue.prototype.$http= axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach(function (to, from, next) {
  const role = localStorage.getItem('ms_username');
  console.log(role)
  console.log(to)

  if (!role && to.path !== '/login') {
    next('/login');

  } else if(to.meta.permission){
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/fzthree');
  }else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
