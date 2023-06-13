1.1 路由组件和非路由组件有什么区别？
  -路由组件一般放在pages|views文件夹，非路由组件一般放置在components文件夹
  -非路由组件都是以标签的形式使用
  
  $route:一般获取路由信息{路径、query、params等等}
  $router:一般进行编程式导航，进行路由跳转{push|replace}

1.2 路由的跳转
  声明式导航router-link
  编程式导航push|replace

1.3 
  Footer组件在Home、Search显示，在Login、Register隐藏
  使用v-show

1.4 路由传参，参数有几种写法？
  params参数：属于路径当中的一部分，需要注意的是，在配置路由的时候，需要占位
  query参数：不属于路径当中的一部分，类似于ajax中的queryString /home?k=v&k1=v1，不需要占位

1.5 
1)如何控制params参数可传可不传？
  在路由组件占位后加?
    path: '/search/:keyWord?'
2)如果params传的参数是空字符串，导致路径有问题，如何解决？
  配合1)在参数后加上undefined
    params:{key:'' || undefined}

1.6 路由组件是可以传递props
  1)布尔值写法
      只能传递params参数
  2)对象写法
      额外的给路由组件传递一些props
  3)函数写法
      props($route){
        return {key:$route.params.key,k:$route.query.k}
      }

1.7 vuex基本使用
  state,getters,mutations,actions,modules

  dispatch和actions通信
  commit和mutations通信
1.8 vuex实现模块化开发

1.9 防抖与节流
  防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次

  节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发


2.0 mockjs的基本使用
  1)创建mock文件夹
  2)准备json数据 放入mock文件夹
  3)把数据需要用到的文件放到public文件夹
  4)开始mockjs 创建mockServe.js文件
  5)mockServe.js在入口文件中引入