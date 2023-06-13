<template>
  <div>
    <Header/>
    <!-- 路由组件占位 -->
    <router-view></router-view>
    
    <Footer v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  created() {
    // 通知vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch("home/baseCategoryList");
  },
}
</script>

<style>
  a{
    cursor: pointer;
  }
</style>
