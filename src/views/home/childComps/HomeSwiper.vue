<template>
  <swiper>
    <swiper-item v-for="item in banners" >
      <a :href="item.link" >
        <img :src="item.image" alt="" @load="swiperLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index'
    export default {
      name: "HomeSwiper",
      props:{
        banners:{
          type: Array,
          default(){
            return []
          }
        }
      },
      data(){
        return  {
          isFlag:true
        }
      },
      components:{
        Swiper,
        SwiperItem
      },
      methods:{
        swiperLoad(){
          //我们要在这里监听轮播图的图片啥时候加载完成,这样我们才能获取tab-control的正确位置
          //console.log('轮播图加载完成');
          // if(this.isFlag){
            this.$emit('swiperLoad')
            // console.log('一次')
            // this.isFlag =false
          // }
        }
      }
    }
</script>

<style scoped>

</style>
