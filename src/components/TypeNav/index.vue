<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="currentIndex=-1;isShowTypeNav=false" @mouseenter="isShowTypeNav=true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="$route.name!=='Home'?isShowTypeNav:true">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                :class="currentIndex === index ? 'active' : ''"
                @mouseenter="changeIndex(index)"
                v-for="(b1, index) in baseCategoryList"
                :key="b1.categoryId"
              >
                <h3>
                  <a
                    :data-categoryName="b1.categoryName"
                    :data-category1Id="b1.categoryId"
                    >{{ b1.categoryName }}</a
                  >
                </h3>
                <!-- 二三级分类 -->
                <div class="item-list clearfix" v-show="currentIndex === index">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="b2 in b1.categoryChild"
                      :key="b2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="b2.categoryName"
                          :data-category2Id="b2.categoryId"
                          >{{ b2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="b3 in b2.categoryChild" :key="b3.categoryId">
                          <a
                            :data-categoryName="b3.categoryName"
                            :data-category3Id="b3.categoryId"
                            >{{ b3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入lodash的节流功能
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移入哪一个一级分类
      currentIndex: -1,
      // 是否展示下拉导航
      isShowTypeNav: false
    };
  },
  // 组件挂载完毕，可以向服务器发请求
  computed: {
    // 三级联动数据
    ...mapState("home", ["baseCategoryList"]),
  },
  methods: {
    // 通过鼠标移入事件修改当前的索引值 throttle添加节流功能 最好不要用箭头函数
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 搜索|点击导航栏并传递参数给Search组件
    goSearch(event) {
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      if (categoryname) {
        let location = {name:'Search'}
        let query = {categoryName:categoryname}
        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
          query.category2Id = category2id
        }else{
          query.category3Id = category3id
        }
        // 如有params参数 将它带上
        if(this.$route.params){
          location.params = this.$route.params
        }
        location.query = query
        this.$router.push(location)
      }
    },
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27.4px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          a:hover{
            cursor: pointer;
          }
          .item-list {
            display: block;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .active {
          background-color: skyblue;
        }
      }
    }

    // 过渡动画的样式
    .sort-enter{
      opacity: 0;
    }
    .sort-enter-active{
      transition: all .5s;
    }
    .sort-enter-to{
      opacity: 1;
    }
  }
}
</style>
