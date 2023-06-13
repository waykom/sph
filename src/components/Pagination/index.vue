<template>
  <div class="pagination" v-if="total">
    <button :class="{dis:pageNo===1}" @click="goPages(pageNo-1)">上一页</button>
    <button @click="goPages(1)" v-show="pages.start>1">1</button>
    <button v-show="pages.start>2">...</button>
    
    <button
      :class="{active:pageNo===page}"
      v-for="(page,index) in pages.end" 
      :key="index" 
      v-show="page>=pages.start"
      @click="goPages(page)"
    >
      {{page}}
    </button>

    <button v-show="pages.end<totalPages-1">...</button>

    <button @click="goPages(totalPages)" v-show="pages.end<totalPages">{{totalPages}}</button>
    <button :class="{dis:pageNo===totalPages}" @click="goPages(pageNo+1)">下一页</button>
    <button style="margin-left:30px">共{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // data(){
  //   return{
  //     continues:5
  //   }
  // },
  props:['totalPages','pageNo','total','continues'],
  computed:{
    // ...mapGetters("search", ["totalPages",'pageNo','total']),
    pages(){
      const {totalPages,pageNo,continues} = this
      let start = 0, end = 0
      if(continues>totalPages){
        start = 1
        end = totalPages
      }else{
        start = pageNo - parseInt(continues/2)
        end = pageNo + parseInt(continues/2)
        if(start<1){
          start = 1
          end = continues
        }
        if(end>totalPages){
          start = totalPages - continues + 1
          end = totalPages
        }
      }
      return {start,end}
    }
  },
  methods:{
    goPages(page){
      this.$emit('goPages',page)
    }
  }
};
</script>

<style lang="less" scoped>
.pagination{
  text-align: center;
  button {
    margin:0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 8px;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &.active{
      background-color: skyblue;
    }

    &:hover{
      background-color: #ddd;
    }

    &.dis{
      pointer-events: none;
    }
  }
}
</style>