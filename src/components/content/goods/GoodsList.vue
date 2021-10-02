<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goodsItem="item" />
  </div>
</template>
<script>
  import GoodsListItem from "./GoodsListItem";
    export default {
      name: "GoodsList",
      components:{
        GoodsListItem
      },
      props:{
        goods:{
          type:Array,
          default(){
            return []
          }
        }
      }
    }
</script>

<style scoped>
.goods-list {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
