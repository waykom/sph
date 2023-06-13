import { ShopCartListAPI,DeleteCartAPI,CheckCartAPI } from "@/api";
export default {
  namespaced:true,
  state:{
    shopCartList:[]
  },
  getters:{
    cartInfoList:(state)=>state.shopCartList.cartInfoList || []
  },
  mutations:{
    SHOPCARTLIST(state,shopCartList){
      state.shopCartList = shopCartList[0] || []
    }
  },
  actions:{
    async getShopCartList(context){
      const res = await ShopCartListAPI()
      if(res.code===200){
        context.commit('SHOPCARTLIST',res.data)
      }
    },
    async deleteCart(context,skuId){
      const res = await DeleteCartAPI(skuId)
      if (res.code===200){
        return "ok"
      }else{
        return Promise.reject(new Error('failed'))
      }
    },
    async changeCheckCart(context, {skuId, isChecked}){
      const res = await CheckCartAPI(skuId,isChecked)
      if (res.code===200){
        return "ok"
      }else{
        return Promise.reject(new Error('failed'))
      }
    },
    deleteCheckedCart({dispatch,getters}){
      let PromiseAll = []
      getters.cartInfoList.forEach(item=>{
        if(item.isChecked===1){
          const res = dispatch('deleteCart',item.skuId)
          PromiseAll.push(res)
        }
      })
      // Promise.all:如果有一个promise失败，则都失败
      return Promise.all(PromiseAll)
    },
    checkAllCart({dispatch,getters},isChecked){
      let PromiseAll = []
      let invert = isChecked===1 ? 0 : 1
      getters.cartInfoList.forEach(item=>{
        if(item.isChecked===invert){
          const res = dispatch('changeCheckCart',{skuId:item.skuId,isChecked})
          PromiseAll.push(res)
        }
      })
      return Promise.all(PromiseAll)
    }
  }
}