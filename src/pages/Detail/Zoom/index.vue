<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img ref="img" :src="imgUrl" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "Zoom",
    data(){
      return{
        currentIndex:0
      }
    },
    computed:{
      ...mapGetters('detail',['skuInfo']),
      imgUrl(){
        let skuInfo = this.skuInfo || {}
        let skuImageList = skuInfo.skuImageList || []
        let imgObj = skuImageList[this.currentIndex] || {}
        let imgUrl = imgObj.imgUrl
        return imgUrl
      }
    },
    methods:{
      handler(event){
        /* 
          offsetX：鼠标到盒子左外边的距离
          offsetY：鼠标到盒子上外边的距离
          offsetWidth：盒子的宽度
          offsetHeight：盒子的高度
         */
        let mask = this.$refs.mask
        let img = this.$refs.img
        let left = event.offsetX - mask.offsetWidth/2
        let leftMix = event.target.offsetWidth - mask.offsetWidth
        let top = event.offsetY - mask.offsetHeight/2
        let topMix = event.target.offsetHeight - mask.offsetHeight
        if(left <= 0) left = 0
        if(left >= leftMix) left = leftMix
        if(top <= 0) top = 0
        if(top >= topMix) top = topMix
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'
        img.style.left = -left*2 + 'px'
        img.style.top = -top*2 + 'px'
      }
    },
    mounted(){
      this.$bus.$on("getImgIndex",(index)=>{this.currentIndex = index})
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>