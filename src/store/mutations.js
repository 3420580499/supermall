
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  //mutation唯一的目的，修改state中的状态
  //但是mutation方法规则是比较单一的，一个方法只做一件事情,所以addCart方法应放到actions中
  // addCart(state, payload) {
  // }
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    //将商品添加到cartList中的同时,给它绑定一个选中值
    payload.checked = true
    state.cartList.push(payload)
  }

}
