<template>
   <div id="detail-goods" v-if="Object.keys(goods).length !== 0">
     <div class="detail-goods-title">{{goods.title}}</div>
     <div class="detail-price">
       <span class="price">{{goods.price}}</span>
       <span class="oldPrice" v-if="goods.oldPrice != null">{{goods.oldPrice}}</span>
       <span class="discountDesc"  v-if="goods.oldPrice != null">{{goods.discountDesc}}</span>
     </div>
     <div class="detail-columns">
       <div v-for="item in goods.columns" class="column">{{item}}</div>
     </div>
     <div class="detail-services">
     <!--因为goods刚开始为{}.所以这里的length会爆红,必须在前面加上为{}就不渲染的条件-->
       <div v-for="index in goods.services.length-1" >
         <img v-if="goods.services[index-1].icon != null" :src="goods.services[index-1].icon" alt="">
         <span>{{goods.services[index-1].name}}</span>
       </div>
     </div>
   </div>
</template>

<script>
    export default {
      name: "DetailGoods",
      props:{
        goods:{
          type:Object,
          default(){
            return {}
          }
        }
      }
    }
</script>

<style scoped>
  .detail-goods-title {
    padding: 10px 5px 5px 5px;
    font-size: 15px;
    font-weight: 500;
  }
  .detail-price .price {
    display: inline-block;
    padding-left: 5px;
    color: var(--color-high-text);
    font-size: 20px;
  }
  .detail-price .oldPrice {
    display: inline-block;
    padding-left: 5px;
    font-size: 8px;
    text-decoration: line-through;
  }
  .detail-price .discountDesc {
    display: inline-block;
    padding:2px;
    margin-left: 5px;
    /*margin-bottom: 5px;*/
    border-radius: 6px;
    background-color: #ef677e;
    color: #fff;
    font-size:12px;
  }
  .detail-columns {
    display: flex;
    /*注意这里是不需要给子盒子份数的*/
    justify-content: space-between;
    color: #999;
    font-size: 12px;
    padding: 10px 4px;
    border-bottom: 1px solid #ededed;
    border-top: 1px solid #ededed;
  }
  .detail-services {
    color: #999;
    font-size: 13px;
    padding: 10px 4px;
    border-bottom: 1px solid #ededed;
    display: flex;
    justify-content: space-between;
  }
  .detail-services img{
    position: relative;
    top: -2px;
    width: 14px;
    height: 14px;
    vertical-align: middle;
  }
</style>
