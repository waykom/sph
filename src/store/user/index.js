import {GetCodeAPI,RegisterUserAPI, UserLoginAPI,GetUserInfoAPI,UserLogoutAPI,UserTradeAPI} from '@/api'
export default {
  namespaced:true,
  state:{
    code:'',
    token:'',
    isAutoLogin:false,
    userInfo:{},
    tradeInfo:{}
  },
  mutations:{
    GETCODE(state,code){
      state.code = code
    },
    USERLOGIN(state,token){
      state.token = token
    },
    AUTOLOGIN(state,isAutoLogin){
      state.isAutoLogin = isAutoLogin
    },
    GETUSERINFO(state,userInfo){
      state.userInfo = userInfo
      sessionStorage.setItem('user',userInfo.name)
    },
    CLEARUSREINFO(state){
      state.userInfo = {}
      state.token = ''
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    TRADEINFO(state,tradeInfo){
      state.tradeInfo = tradeInfo
    }
  },
  getters:{
    detailArrayList:(state) => state.tradeInfo.detailArrayList || [],
    totalAmount:(state) => state.tradeInfo.totalAmount || 0,
    totalNum:(state) => state.tradeInfo.totalNum || 0,
    userAddressList:(state) => state.tradeInfo.userAddressList || [],
    tradeNo:(state) => state.tradeInfo.tradeNo || ''
  },
  actions:{
    async getCode(context,phone){
      const res = await GetCodeAPI(phone)
      if(res.code === 200){
        context.commit('GETCODE',res.data)
      }else{
        return Promise.reject(new Error('failed'))
      }
    },
    async userRegister(context, data){
      const res = await RegisterUserAPI(data)
      if(res.code === 200){
        return 'ok'
      }else{
        return Promise.reject(new Error(res.message))
      }
    },
    async userLogin(context,data){
      const {phone,password,isAutoLogin} = data
      const res = await UserLoginAPI({phone,password})
      if(res.code === 200){
        context.commit('USERLOGIN',res.data.token),
        context.commit('AUTOLOGIN',isAutoLogin)
        return 'ok'
      }else{
        return Promise.reject(new Error(res.message))
      }
    },
    async getUserInfo(context){
      const res = await GetUserInfoAPI()
      if(res.code === 200){
        context.commit('GETUSERINFO',res.data)
      }else {
        // token过期的话
        context.commit('CLEARUSREINFO')
      }
    },
    async userLogout(context){
      const res = await UserLogoutAPI()
      if(res.code === 200){
        context.commit('CLEARUSREINFO')
        return 'ok'
      }else{
        return Promise.reject(new Error(res.code))
      }
    },
    async userTradeInfo(context){
      const res = await UserTradeAPI()
      if(res.code === 200){
        context.commit('TRADEINFO',res.data)
      }else{
        return Promise.reject(new Error(res.code))
      }
    }
  }
}