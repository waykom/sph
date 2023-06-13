import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用VueRouter插件
Vue.use(VueRouter)
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 二级路由
import MyOrder from '@/pages/Center/components/MyOrder'
import GroupOrder from '@/pages/Center/components/GroupOrder'


// 先把VueRouter原型对象的push备份一份
const originPush = VueRouter.prototype.push
// 先把VueRouter原型对象的replace备份一份
const originReplace = VueRouter.prototype.replace
/* 
  重写push|replace
    第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
    第二个参数：成功的回调函数
    第三个参数：失败的回调函数
 */
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    originPush.call(this, location, reslove, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, reslove, reject) {
  if (reslove && reject) {
    originReplace.call(this, location, reslove, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

const router =  new VueRouter({
  mode: 'history',
  base: '/vue2/',
  // 配置路由
  routes: [
    {
      // 重定向到首页
      path: '/',
      redirect: '/home'
    },
    {
      name: 'Home',
      path: '/home',
      component: Home,
      meta: { showFooter: true, reqLogin:false }
    },
    {
      name: 'Search',
      path: '/search/:keyword?',
      component: Search,
      meta: { showFooter: true, reqLogin:false },
    },
    {
      name: 'PaySuccess',
      path: '/paysuccess',
      component: PaySuccess,
      meta: { showFooter: true, reqLogin:true },
    },
    {
      name:'Detail',
      path:'/detail/:skuId?',
      component: Detail,
      meta: { showFooter: true, reqLogin:false }
    },
    {
      name:'AddCartSuccess',
      path:'/addCartSuccess',
      component: AddCartSuccess,
      meta: { showFooter: true, reqLogin:true }
    },
    {
      name:'ShopCart',
      path:'/shopcart',
      component: ShopCart,
      meta: { showFooter: true, reqLogin:true }
    },
    {
      name:'Trade',
      path:'/trade',
      component: Trade,
      meta: { showFooter: true, reqLogin:true }
    },
    {
      name:'Pay',
      path:'/pay',
      component: Pay,
      meta: { showFooter: true, reqLogin:true }
    },
    {
      name:'Center',
      path:'/center',
      component: Center,
      meta: { showFooter: true, reqLogin:true },
      children:[
        {
          path:'/center',
          redirect:'/center/myOrder'
        },
        {
          path:'myOrder',
          component: MyOrder,
          meta: { showFooter: true, reqLogin:true }
        },
        {
          path:'groupOrder',
          component: GroupOrder,
          meta: { showFooter: true, reqLogin:true }
        },
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
      meta: { showFooter: false, reqLogin:false }
    },
    {
      name: 'Register',
      path: '/register',
      component: Register,
      meta: { showFooter: false, reqLogin:false }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})

router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')
  if(!to.meta.reqLogin){
    // 如果去的是登录和注册页面 判断是否已登录 若登录 则不允许访问
    if(to.path === '/login' || to.path === '/register'){
      if(token){
        alert('您已登录！')
        next('/home')
      }else{
        next()
      }
    }else{
      next()
    }
  }else{
    // 如果说要求登录 看看是否已经登录 如果登录 放行 如果未登录 跳转至登录页面
    if(token){
      next()
    }else{
      alert('请登录')
      next('/login')
    }
  }
})

export default router
