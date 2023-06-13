import { SearchAPI } from "@/api";
export default {
  namespaced:true,
  state:{
    searchList:{}
  },
  // getters：为简化数据而生
  getters:{
    goodsList:(state)=>state.searchList.goodsList || [],
    attrsList:(state)=>state.searchList.attrsList || [],
    trademarkList:(state)=>state.searchList.trademarkList || [],
    total:(state)=>state.searchList.total || 0,
    pageSize:(state)=>state.searchList.pageSize || 0,
    totalPages:(state)=>state.searchList.totalPages || 0,
    pageNo:(state)=>state.searchList.pageNo || 0
  },
  mutations:{
    GETSEARCHLIST(state,searchList){
      state.searchList = searchList
    }
  },
  actions:{
    async getSearchList(context,params={}){
      const res = await SearchAPI(params);
      if(res.code===200){
        context.commit('GETSEARCHLIST',res.data)
      }
    }
  },
}