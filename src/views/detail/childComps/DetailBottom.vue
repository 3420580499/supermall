<template>
    <div id=detail-bottom>
      <div class="left">
        <div class="left-left">
          <img src="~assets/image/detail/store.svg" alt="">
          <div>店铺</div>
        </div>
        <div class="left-center">
          <img src="~assets/image/detail/server.svg" alt="">
          <div>客服</div>
        </div>
        <div class="left-right">
          <img src="~assets/image/detail/like.svg" alt="">
          <div>收藏</div>
        </div>
      </div>
      <div class="right">
        <div class="right-one" @click="addToCart">加入购物车</div>
        <div class="right-two">购买</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "DetailBottom",
      //我们可以通过vuex来实现加入购物车功能
      methods:{
        addToCart(){
          this.$emit('addCart');
        }
      }
    }
</script>

<style scoped>
  #detail-bottom {
    padding-top: 5px;
    font-size: 15px;
    text-align: center;
    background-color: #fff;
    height: 39px;
  }
  #detail-bottom .left {
    display: flex;
    justify-content: space-evenly;
    height: 39px;
    background-color: #fff;
    width: 40%;
  }
  .left img {
    height: 15px;
    width: 15px;
  }
  .right {
    background-color: #fff;
    color: #fff;
    line-height: 39px;
    display: flex;
    height: 39px;
    width: 60%;
  }
  .right-one {
    width: 50%;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    background-color: #fb9301;
  }
  .right-two {
    width:50%;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #fb5200;
  }
</style>
