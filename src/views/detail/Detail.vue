<template>
    <div id="detail">
      <detail-nav-bar />
      <Scroll class="scroll" ref="scroll">
        <detail-swiper :detailSwiperImg="detailSwiperImg"/>
        <detail-goods :goods="goods"/>
        <detail-shops :shop="shop"/>
        <detail-image :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-params :param-info="goodsParam"/>
      </Scroll>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailGoods from "./childComps/DetailGoods";
    import DetailShops from "./childComps/DetailShops";
    import DetailImage from "./childComps/DetailImage";
    import DetailParams from "./childComps/DetailParams";

    import Scroll from "../../components/common/scroll/Scroll";

    import {getDetail,Goods,Shop,GoodsParam} from "../../network/detail";
    export default {
      name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailGoods,
        DetailShops,
        DetailImage,
        DetailParams,
        Scroll
      },
      data(){
        return {
          //注意这里的数据类型要与后面接收方定义的数据类型一致( null不是{} )
          iid:null,
          detailSwiperImg:[],
          goods:{},
          shop:{},
          detailInfo:{},
          goodsParam:{}
        }
      },
      created() {
        //保存传入的iid
        this.iid = this.$route.params.iid
        //根据iid去请求数据
        getDetail(this.iid).then((res) =>{
          const data = res.result
          //商品轮播图的图片信息
          this.detailSwiperImg = data.itemInfo.topImages
          console.log(res.result);
          //商品的基本信息(价格,退货等)
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo)
          //店铺的基本信息
          this.shop = new Shop(data.shopInfo)
          //商品的图片信息
          this.detailInfo = data.detailInfo
          //商品的参数信息
          this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        })
      },
      methods:{
        imageLoad(){
          this.$refs.scroll.refresh()
        }
      }
    }
</script>

<style scoped>
  #detail {
    /*让让它脱标,让它在navBar的上面*/
    position: relative;
    z-index: 99;
    /*给个背景颜色让用户看不到navBar*/
    background-color: #fff;
    /*这里一定要设置高度*/
    height: 100vh;
  }
  .scroll {
    /*这里也要设置高度*/
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
