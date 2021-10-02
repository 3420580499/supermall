import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types';

export default {
  addCart(context, payload) {
    return new Promise((resolve,reject) =>{
      //判断购物车里面是否已经有了该商品
      let oldProduct = context.state.cartList.find((item) =>{
        return item.iid === payload.iid
      })
      if(oldProduct){
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量加1')
      }else {
        context.commit(ADD_TO_CART,payload)
        resolve('商品加入购物车成功')
      }
    })
  }
}
