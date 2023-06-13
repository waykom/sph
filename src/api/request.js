// 对axios进行二次封装
import axios from "axios"
// 引入进度条
import nProgress from "nprogress"
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入uuid
import { getUUID,getStoreToken } from "@/utils"

/* 
  1.利用axios对象的方法create，创建一个axios实例
*/

const requests = axios.create({
  // 基础路径
  baseURL: '/api',
  // 设置超时时间
  timeout: 5000,
})

// 请求拦截器：在发请求之前做一些事情
requests.interceptors.request.use((config) => {
  // config：配置对象，有一个东西重要，header请求头

  // 进度条开始动
  nProgress.start();

  // 带上userTempId
  // const uuid = getUUID()
  // config.headers.userTempId = uuid

  const token = getStoreToken()
  if(token){ config.headers.token = token }

  return config
})

// 响应拦截器
requests.interceptors.response.use(
  // 成功的回调函数
  (response) => {
    // 进度条结束
    nProgress.done()

    return response.data
  },
  // 失败的回调函数
  (error) => {
    return Promise.reject(new Error('faile'))
  }
)

export default requests