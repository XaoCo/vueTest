import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import Antd from 'ant-design-vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './utils/http'
import 'ant-design-vue/dist/antd.css'
import '@/assets/styles/reset.css'
import SvgIcon from '@/pages/common/SvgIcon.vue' //引入svg组件
import { updateRouter } from '@/permission.js' // 加载路由
updateRouter()

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(ElementUI);
Vue.prototype.$http = http
Vue.component('svg-icon', SvgIcon)  //全局注册IconSvg
const requireAll = reqireContext => reqireContext.keys().map(reqireContext)
const req = require.context('./assets/svg', false, /\.svg$/)
requireAll(req)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
