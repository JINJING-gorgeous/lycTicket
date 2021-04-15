import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'webgl&ak=6SYLAmZnwy5QSezOzBZz7uWD3ihm29Wo'
})

//配置mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI)

//moent.js
import moment from 'moment'
Vue.prototype.moment=moment

//axios
import axios from 'axios'
axios.defaults.baseURL='http://api.youlove.fun/lyc';
Vue.prototype.axios=axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
