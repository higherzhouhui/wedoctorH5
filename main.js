import Vue from 'vue'
import App from './App'
import store from './store'
import MinCache from'./common/util/MinCache.js'
import router from './common/router'
import {RouterMount} from './plugin/uni-simple-router/index.js'


// 注册缓存器
Vue.use(MinCache,{timeout: 6})

// store
Vue.prototype.$store=store;
// tip

// request请求
import { http } from '@/utils/request.js' 
Vue.prototype.$http = http


// import VConsole from './js_sdk/vconsole.min'

//   var vConsole = new VConsole();

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	MinCache,
    ...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif



 



