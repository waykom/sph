// API统一管理
import requests from "./request";
import mockRequests from './mockRequests'
// 三级联动接口
export const BaseCategoryListAPI = () => requests.get('/product/getBaseCategoryList')

// 搜索商品接口
export const SearchAPI = (params) => requests.post('/list',params)

// 获取商品详情接口
export const GoodsInfoAPI = (skuId) => requests.get(`/item/${ skuId }`)

// 添加|更新购物车列表信息
export const ShopCartAPI = (skuId, skuNum) => requests.post(`/cart/addToCart/${ skuId }/${ skuNum }`)

// 获取购物车列表
export const ShopCartListAPI = () => requests.get('/cart/cartList')

// 删除购物车中的商品
export const DeleteCartAPI = (skuId) => requests.delete(`/cart/deleteCart/${skuId}`)

// 切换商品选中状态
export const CheckCartAPI = (skuId,isChecked) => requests.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 获取注册验证码
export const GetCodeAPI = (phone) => requests.get(`/user/passport/sendCode/${phone}`)

// 注册用户
export const RegisterUserAPI = (params) => requests.post('/user/passport/register',params)

// 用户登录
export const UserLoginAPI = (params) => requests.post('/user/passport/login',params)

// 获取用户信息
export const GetUserInfoAPI = () => requests.get('/user/passport/auth/getUserInfo')

// 退出登录
export const UserLogoutAPI = () => requests.get('/user/passport/logout')

// 获取订单交易页信息
export const UserTradeAPI = () => requests.get('/order/auth/trade')

// 提交订单
export const SubmitOrderAPI = (tradeNo,data) => requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,data)

// 获取订单支付信息
export const PayInfoAPI = (orderId) => requests.get(`/payment/weixin/createNative/${orderId}`)

// 获取订单支付状态
export const PayStatusAPI = (orderId) => requests.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 获取我的订单列表
export const MyOrderAPI = (page,limit) => requests.get(`/order/auth/${page}/${limit}`)

// mockjs模拟数据接口
// 获取banner轮播图接口
export const GetBannerList = () => mockRequests.get('/banner')
// 获取floor数据接口
export const GetFloorList = () => mockRequests.get('/floor')