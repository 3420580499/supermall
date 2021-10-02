import Vue from "vue";
import Vuex from 'vuex';

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
//1、安装插件
Vue.use(Vuex)

//2、创建store对象
const state = {
  //将加入的购物车信息加入到里面
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//3、导出
export default store
