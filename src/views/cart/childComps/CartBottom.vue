<template>
    <div id="cart-bottom">
      <check-btn class="check-btn" @click.native="totalClick" :checked="isCheck"/>全选
      <div class="total">
        <span>总计:￥{{totalPrice}}</span>
      </div>
      <div class="goTo">
        <span>去结算{{'('+$store.state.cartList.filter(item => item.checked===true).length+')'}}</span>
      </div>
    </div>
</template>

<script>
    import CheckBtn from "./CheckBtn";
    //这里我们可以引入mapactions和mapgetters来减少代码量
    export default {
      name: "CartBottom",
      components:{
        CheckBtn
      },
      //但我们点击上面的按钮来影响全选的按钮
      computed :{
        totalPrice() {
          const cartList = this.$store.getters.cartList;
          return cartList.filter(item => {
            return item.checked
          }).reduce((preValue, item) => {
            return preValue + item.count * item.price
          }, 0).toFixed(2)
        },
        isCheck(){
          if(this.$store.state.cartList.length ===0){
            return false
          }else{
            //如果找到了checked为false的,我们还是不全选
            return !this.$store.state.cartList.find(item => item.checked === false)
          }
          // return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
        }
      },
      //但我们点击全选的按钮来影响上面的按钮
      methods:{
        totalClick(){
          // 1.判断是否有未选中的按钮
          let isSelectAll = this.$store.state.cartList.find(item => !item.checked);
          // 2.有未选中的内容, 则全部选中
          if (isSelectAll) {
            this.$store.state.cartList.forEach(item => {
              item.checked = true;
            });
          } else {
            this.$store.state.cartList.forEach(item => {
              item.checked = false;
            });
          }
        }
      }
    }
</script>

<style scoped>
  #cart-bottom {
    position: relative;
    font-size: 16px;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #f6f6f6;
  }
  .check-btn {
    line-height: 0;
    margin-left: 5px;
    margin-right: 5px;
    position: relative;
    top: 10px;
    height: 20px;
  }
  .total {
    color: var(--color-tint);
    margin-left: 10px;
  }
  .goTo {
    color: #fff;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    width:80px;
    height: 40px;
    background-color: #fb9301;
  }
   #cart-bottom .isCheck {
    background-color: var(--color-high-text);
    border: 0
  }
</style>
