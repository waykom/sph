import { GoodsInfoAPI,ShopCartAPI} from '@/api'
export default {
  namespaced:true,
  state:{
    goodInfo:{}
  },
  getters:{
    categoryView:(state)=>state.goodInfo.categoryView || {},
    skuInfo:(state)=>state.goodInfo.skuInfo || {},
    spuSaleAttrList:(state)=>state.goodInfo.spuSaleAttrList || [],
  },
  mutations:{
    GETGOODSINFO(state,goodInfo){
      state.goodInfo = goodInfo
    }
  },
  actions:{
    async getGoodsInfo(context,id){
      const res = await GoodsInfoAPI(id)
      if(res.code === 200){
        context.commit('GETGOODSINFO',res.data)
      }
    },
    async addOrUpdateShopCart(context,{skuId, skuNum}){
      const res = await ShopCartAPI(skuId, skuNum)
      if (res.code===200){
        return "ok"
      }else{
        return Promise.reject(new Error('failed'))
      }
    },
  }
}