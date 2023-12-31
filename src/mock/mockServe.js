// 模拟数据
// 引入mockjs模块
import Mock from "mockjs"
// 引入json数据
// webpack默认对外暴露的：图片、json文件
import banner from './banner.json'
import floor from './floor.json'

// mock数据：第一个参数是请求地址，第二个参数是请求数据

// 轮播图数据
Mock.mock("/mock/banner",{
  code:200,
  data:banner
})

// 楼层数据
Mock.mock("/mock/floor",{
  code:200,
  data:floor
})