<template>
  <div id="detail-swiper">
    <swiper>
      <swiper-item v-for="item in detailSwiperImg" class="detail-swiper-item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index'
    export default {
      name: "DetailSwiper",
      props:{
        detailSwiperImg:{
          type:Array,
          default(){
            return []
          }
        }
      },
      components:{
        Swiper,
        SwiperItem
      }
    }
</script>

<style scoped>
.detail-swiper-item {
  height: 270px;
  overflow: hidden;
  border-radius: 10px;
}
</style>
