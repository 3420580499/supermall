<template>
  <div id="shop-item">
    <check-btn class="btn" @click.native="btnCLick" :checked="carts.checked"/>
    <div class="item-img">
      <img :src="carts.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{carts.title}}</div>
      <div class="item-desc">商品描述: {{carts.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{carts.price}}</div>
        <div class="item-count right">x{{carts.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckBtn from "./CheckBtn";
  export default {
    name: 'CartListItem',
    props: {
      carts:{
        type:Object
      }
    },
    components:{
      CheckBtn
    },
    methods :{
      btnCLick(){
        this.carts.checked = !this.carts.checked
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .btn {
    height: 20px;
    position: relative;
    top: 40px;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img {
    flex: 1;
    padding: 5px;

  }
  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info-bottom .item-price {
    color: orangered;
  }
  .item-count {
    padding: 2px;
    border-radius: 7px;
    border: 2px solid var(--color-high-text);
  }
</style>
