import Vue from 'vue'
import App from './App.vue'
// 引入图片懒加载模块
import VueLazyload from 'vue-lazyload'
// 引入图片懒加载时展示的图片
import loadimg from '@/assets/logo.png'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图全局组件
import Carousel from '@/components/Carousel'
// 分页器
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字 第二个参数：组件
// 注册三级联动组件
Vue.component(TypeNav.name,TypeNav)
// 注册轮播图组件
Vue.component(Carousel.name,Carousel)
// 分页器
Vue.component(Pagination.name,Pagination)

// 注册图片懒加载插件
Vue.use(VueLazyload, {
	// 懒加载时展示的图片配置
  loading: loadimg
})

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mock
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 
import { MessageBox } from 'element-ui';

// 引入api
import * as API from '@/api'

new Vue({
  el:'#app',
  // 注册路由
  router,
  // 注册仓库
  store,
  render: h => h(App),
  beforeCreate(){
    // 注册全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$msgBox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
  }
})
