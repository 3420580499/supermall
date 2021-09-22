<template>
    <div id="detail">
      <detail-nav-bar />
      <detail-swiper :detailSwiperImg="detailSwiperImg"/>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";

    import {getDetail} from "../../network/detail";
    export default {
      name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper
      },
      data(){
        return {
          iid:null,
          detailSwiperImg:[]
        }
      },
      created() {
        //保存传入的iid
        this.iid = this.$route.params.iid
        //根据iid去请求数据
        getDetail(this.iid).then((res) =>{
          this.detailSwiperImg = res.result.itemInfo.topImages
          //console.log(this.DetailSwiperImg);
        })
      }
    }
</script>

<style scoped>

</style>
