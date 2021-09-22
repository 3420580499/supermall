<template>
   <div class="goods-list-item" @click="goToDetail">
     <img :src="goodsItem.show.img" alt="" @load="imgLoad">
     <div class="goods-div">
       <p>{{goodsItem.title}}</p>
       <span class="price">{{goodsItem.price}}</span>
       <span class="cfav">{{goodsItem.cfav}}</span>
     </div>
   </div>
</template>

<script>
    export default {
      name: "GoodsListItem",
      props:{
        goodsItem:{
          type:Object,
          default(){
            return {}
          }
        }
      },
      methods:{
        //我们要在这监听每张图片加载完成的事件
        //我们要告诉home.vue有一张图片加载完成了,从而使用refresh方法
        imgLoad(){
          //也可以使用子组件发射自定义事件的方式,不过层级太多,比较麻烦
          //还可以使用vuex的方法,在里面声明一个状态,这里的图片加载完,就会改变这个状态,home.vue会监听你改变了状态,继而调用refresh方法
          //这里我们通过事件总线(类似于vuex,它是管理事件的)的方式,可以反射出一个事件,在home.vue就可以直接监听到
          //这个$bus我们要在main.js中自己定义
          this.$bus.$emit('everyImgLoad')
        },
        goToDetail(){
          //console.log('点击了');
          this.$router.push('/detail/'+this.goodsItem.iid)
        }
      }
    }
</script>

<style scoped>
  .goods-list-item {
    border:1px solid #fff;
    border-radius: 6px;
    width: 48%;
    margin-bottom: 6px;
  }
  .goods-list-item img{
    border-radius: 6px;
    width: 100%;
  }
  .goods-div {
    text-align: center;
  }
  .goods-div p{
    color: var(--color-high-text);
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 3px 3px 3px 3px;
  }
  .goods-div .price {
    display: inline-block;
    margin-right:25px;
    font-size: 14px;
    color: var(--color-high-text);
  }
  .goods-div .cfav {
    position: relative;
    font-size: 14px;
    z-index: -1;
  }
  .goods-div .cfav::before{
    position: absolute;
    /*定位到外面,就不会被占位置了*/
    left: -14px;
    bottom: 1px;
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url("~assets/image/home/love.svg") ;
    /*盒子太小,要将背景缩放*/
    background-size: 100%;
  }
</style>
