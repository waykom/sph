<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册成为全局组件，因此不需要引入和注册 -->
    <TypeNav />
    <!-- 轮播图等主要内容 -->
    <ListContainer />
    <!-- 今日推荐 -->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />

    <!-- 其他楼层 -->
    <Floor v-for="floor in floorList" :key="floor.id" :floorList="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
  mounted() {
    this.$store.dispatch("home/getFloorList");
    this.$store.dispatch('user/getUserInfo')
  },
};
</script>

<style lang="scss" scoped>
</style>