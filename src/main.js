/**
 * 入口JS文件
 *
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import states from './store/states'
import actions from './store/actions'
import mutations from './store/mutations'
import getters from './store/getters'
import VueResource from 'vue-resource'
import NgPlugins from './ng-plugins'
import EasyScroll from 'easyscroll'
import Global from '../config/global.js'
import ElementUI from 'element-ui'
import {Loading} from 'element-ui';

Vue.prototype.GLOBAL = Global
Vue.config.productionTip = false
Vue.use(EasyScroll)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(ElementUI)

const store = new Vuex.Store({
  state: states,
  actions: actions,
  mutations: mutations,
  getters: getters
})
// 注册自定义插件(附加仓库数据)
Vue.use(NgPlugins, {store})
//loading 入口
Vue.component('Loading', function (resolve) {
  require(['./components/sitetemplate/common/Loding'], resolve)
})

//全局Loading
let loadingCount = 0, loadingInstance;
Vue.http.interceptors.push((request, next) => {
  var reqId = parseInt(Math.random() * 1000000000)
  if (process.env.NODE_ENV === 'development') {
    console.log('Start send request:' + request.url + ' with requestId:' + reqId)
    console.log(request)
  }
  var applyIf = (def, obj) => {
    for (let key in def) {
      if (!(key in obj)) {
        obj[key] = def[key]
      }
    }
  }
  applyIf({emulateJSON: true, timeout: 10000, loading: true}, request)
  if (request.loading) {
    if (loadingCount === 0) {
      loadingInstance = Loading.service({
        lock: true,
        background: 'transparent'
      });
    }
    loadingCount++
  }

  next((response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Finish request:' + request.url + ' with requestId:' + reqId)
      console.log(response)
    }
    if (request.loading) {
      setTimeout(() => {
        loadingCount--
        if (loadingCount === 0) {
          loadingInstance.close();
        }
      }, 10)
    }
    return response
  });

});

/* eslint-disable no-new */
new Vue({
  el: '#creation',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
