import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
  let uuId = localStorage.getItem('uuid')
  if(!uuId){
    uuId = uuidv4()
    localStorage.setItem('uuid',uuId)
  }
  return uuId
}

import store from '@/store'
export const getStoreToken = () =>{
  let token = sessionStorage.getItem('token') || localStorage.getItem('token')
  if(!token){
    token = store.state.user.token
    if(token){
      sessionStorage.setItem('token',token)
      // 如果勾选自动登录 本地存一份
      if(store.state.user.isAutoLogin){
        localStorage.setItem('token',token)
      }
    }
  }
  return token
}