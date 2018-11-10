/**
 * Created by zhangjinjin on 2018/11/5.
 */
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import common from './modules/common';//引入某个store对象
import user from './modules/user';//引入某个store对象

export default new vuex.Store({
  modules: {
    common: common,
    user: user
  }
})
