<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="sku in cartInfoList" :key="sku.id">
          <li class="cart-list-con1">
            <!-- <input type="checkbox" :checked="sku.isChecked==1" @click="sku.isChecked===1?sku.isChecked=0:sku.isChecked=1" name="chk_list"> -->
            <input type="checkbox" :checked="sku.isChecked===1" @click="changeCheckStatus(sku.skuId,$event)" name="chk_list">
          </li>
          <li class="cart-list-con2">
            <img :src="sku.imgUrl">
            <div class="item-msg">{{sku.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{sku.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,sku.skuId,sku.skuNum)">-</a>
            <input autocomplete="off" type="text" :value="sku.skuNum" minnum="1" @change="handler('change',$event.target.value*1,sku.skuId,sku.skuNum)" class="itxt">
            <a href="javascript:void(0)" class="plus" @click="handler('add',+1,sku.skuId)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{sku.skuNum*sku.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(sku.skuId)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckedAll" @click="checkAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteChecked">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedSkuNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="settlement">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  // 引入lodash的节流功能
  import throttle from "lodash/throttle";
  export default {
    name: 'ShopCart',
    methods: {
      getData() {
        this.$store.dispatch('shopcart/getShopCartList')
      },
      handler:throttle(async function(type,disNum,id,prevSkuNum){
        // 点击+|-事件使用节流，间隔1000ms
        switch(type){
          case 'minus':
            disNum = prevSkuNum > 1 ? -1 : 0
            break
          case 'change':
            if(isNaN(disNum) || disNum < 1){
              disNum = 0
            }else{
              disNum = parseInt(disNum) - prevSkuNum
            }
            break
        }
        try {
          await this.$store.dispatch('detail/addOrUpdateShopCart',{
            skuId:id,skuNum:disNum
          })
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },1000),
      async checkAll(event){
        let isChecked = event.target.checked ? 1 : 0
        try {
          await this.$store.dispatch('shopcart/checkAllCart',isChecked)
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      async deleteCart(id){
        try{
          await this.$store.dispatch('shopcart/deleteCart',id)
          this.getData()
        }catch(error){
          console.log(error.message)
        }
      },
      async changeCheckStatus(id,event){
        try {
          let isChecked = event.target.checked ? 1 : 0
          await this.$store.dispatch('shopcart/changeCheckCart',{skuId:id,isChecked})
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      async deleteChecked(){
        try {
          await this.$store.dispatch('shopcart/deleteCheckedCart')
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      settlement(){
        this.$router.push('/trade')
        this.deleteChecked()
      }
    },
    computed:{
      ...mapGetters('shopcart',['cartInfoList']),
      isCheckedAll(){
        if(this.cartInfoList.length===0){
          return false
        }
        return this.cartInfoList.every((item)=>item.isChecked===1)
      },
      checkedSkuNum(){
        let num = 0
        this.cartInfoList.forEach(item=>{
          if(item.isChecked===1) num ++
        })
        return num
      },
      totalPrice(){
        let sum = 0
        this.cartInfoList.forEach(item=>{
          if(item.isChecked===1){
            sum += item.skuNum*item.skuPrice
          }
        })
        return sum
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>