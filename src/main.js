import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 引入全局字体
import './common/styles/icon.css'
// 引入css样式重置
import './assets/css/reset.css'

// vue消息提示组件
import Message from 'vue-m-message'
import 'vue-m-message/dist/index.css'

// moment
import moment from 'moment'

// import img-vuer and install
import gallery from 'img-vuer'
Vue.use(gallery, {
    swipeThreshold: 150, // default 100
    isIndexShow: true, // show image index, default true
    useCloseButton: true, // trigger gallery close with close button, default true
    preload: true // preload images in the same group, default true
})

Vue.use(Message)

// 阻止启用生产消息
Vue.config.productionTip = false

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.31.73:8000/' : 'http://47.56.13.69:8000'

// 时间格式化
Vue.filter('dateFormat', (dateStr, pattern = 'YYYY-MM-DD') => {
    return moment(dateStr).format(pattern)
})

// 绑定原型
Vue.prototype.$axios = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
