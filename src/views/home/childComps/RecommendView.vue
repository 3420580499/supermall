<template>
<div class="recommend-view">
  <div v-for="item in recommends" class="in" >
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
    export default {
        name: "RecommendView",
        props:{
          recommends:{
            type:Array,
            default() {
              return [];
            }
          }
        },
    }
</script>

<style scoped>
  .recommend-view {
    display: flex;
    padding: 10px 0 15px;
    border-bottom: 5px solid;
    /*边框颜色渐变*/
    border-image: linear-gradient(to right, #efa6b8 ,#ea7e9c, #e0688c ) 1 10;
  }
  .in {
    text-align: center;
    flex: 1;
    font-size: 12px;
  }
  .recommend-view .in img {
    /*最好不要直接给宽度*/
    width: 75%;
    padding-bottom: 5px;
  }
</style>
