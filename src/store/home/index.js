import { BaseCategoryListAPI,GetBannerList,GetFloorList } from '@/api'
export default {
  namespaced:true,
  state:{
    // state中的默认数据初始值别瞎写
    baseCategoryList:[],
    // 轮播图数据
    bannerList: [],
    // floor数据
    floorList:[]
  },
  getters:{},
  mutations:{
    BASECATEGORYLIST(state,baseCategoryList){
      state.baseCategoryList = baseCategoryList
    },
    GETBANNERLIST(state,bannerList){
      state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
      state.floorList = floorList
    }
  },
  actions:{
    async baseCategoryList(context){
      const res = await BaseCategoryListAPI()
      if (res.code === 200){
        context.commit('BASECATEGORYLIST',res.data)
      }
    },
    async getBannerList(context){
      const res = await GetBannerList()
      if(res.code===200){
        context.commit('GETBANNERLIST',res.data)
      }
    },
    async getFloorList(context){
      const res = await GetFloorList()
      if(res.code===200){
        context.commit('GETFLOORLIST',res.data)
      }
    }
  },
}