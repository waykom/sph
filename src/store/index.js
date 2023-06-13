import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'

export default new Vuex.Store({
  /* 
    state:仓库存储数据的地方
    getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    mutations:修改state的唯一手段
    actions:处理action，可以书写自己的业务逻辑，也可以处理异步
    modules:子模块
  */
  state:{
    name:'Vuex',
    count:0
  },
  getters:{},
  mutations:{},
  actions:{},
  modules:{
    home,
    search,
    detail,
    shopcart,
    user
  }
})