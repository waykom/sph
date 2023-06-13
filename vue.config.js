const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'/vue2/',
  transpileDependencies: true,
  lintOnSave: false, //关闭eslint校验功能
  devServer:{
    port: 80,
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
