<template>
    <!--如果要直接在一个组件上监听js中的原生事件,我们要使用到native-->
    <div id="detail">
      <detail-nav-bar @detailBtn="detailBtn" ref="nav"/>
      <!--这里的"3"要写引号,否则传过去的是字符串-->
      <Scroll class="scroll" ref="scroll" :probe-type="3" @position="itemPosition">
        <detail-swiper :detailSwiperImg="detailSwiperImg"/>
        <detail-goods :goods="goods"/>
        <detail-shops :shop="shop"/>
        <detail-image :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-params :param-info="goodsParam" ref="params"/>
        <detail-comment :comment-info="commentInfo" ref="comment"/>
        <goods-list :goods="itemCommend" ref="list"/>
      </Scroll>
      <!--返回顶部的小按钮(我们可以通过mixin来存放公共的代码-->
      <top-btn @click.native="btnClick" v-if="isShow"/>
      <detail-bottom class="bottom" @addCart="addToCart"/>
      <toast :flag="isFlag" :message="message"></toast>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailGoods from "./childComps/DetailGoods";
    import DetailShops from "./childComps/DetailShops";
    import DetailImage from "./childComps/DetailImage";
    import DetailParams from "./childComps/DetailParams";
    import DetailComment from "./childComps/DetailComment";
    import GoodsList from "../../components/content/goods/GoodsList";
    import DetailBottom from "./childComps/DetailBottom";
    import TopBtn from "../../components/content/topbtn/TopBtn";

    import Scroll from "../../components/common/scroll/Scroll";

    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";

    import debounce from "../../common/Util/debounce";
    import {itemListener, publicMaster} from "../../common/Util/mixin";

    // import Toast from "../../components/common/toast/Toast";
    export default {
      name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailGoods,
        DetailShops,
        DetailImage,
        DetailParams,
        DetailComment,
        GoodsList,
        DetailBottom,
        TopBtn,
        Scroll,
        // Toast
      },
      data(){
        return {
          //注意这里的数据类型要与后面接收方定义的数据类型一致( null不是{} )
          iid:null,
          detailSwiperImg:[],
          goods:{},
          shop:{},
          detailInfo:{},
          goodsParam:{},
          commentInfo:{},
          itemCommend:[],
          // itemImgListener:null,
          itemY:[],
          setItemY:null,
          // isFlag: false,
          // message:''
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
          //商品的评论信息
          if( data.rate.list){
            this.commentInfo = data.rate.list[0]
          }
          //如果在外面赋值,this.$refs.params.$el压根没有渲染
          //数据渲染完了,但是图片没有加载完
          //这里获取到的offsetTop值依旧是不对的
          /*this.$nextTick(() =>{
            this.itemY = [];
            this.itemY.push(0);
            this.itemY.push(this.$refs.params.$el.offsetTop);
            this.itemY.push(this.$refs.comment.$el.offsetTop);
            this.itemY.push(this.$refs.list.$el.offsetTop);
          })*/
          this.setItemY = debounce(() =>{
            this.itemY = [];
            this.itemY.push(0);
            this.itemY.push(this.$refs.params.$el.offsetTop);
            this.itemY.push(this.$refs.comment.$el.offsetTop);
            this.itemY.push(this.$refs.list.$el.offsetTop);
            //在这里加入一个最大值是为了方便后面判断范围
            this.itemY.push(Number.MAX_VALUE)
          },100)
        })
        getRecommend().then((res) =>{
          this.itemCommend = res.data.list
        })
      },
      mixins:[itemListener,publicMaster],
      mounted() {
        //这里的代码都放在mixin中了
        //在这里我们可以监听推荐组件中图片加载完成的事件总线,但是,home组件中也会监听到
        //第一种解决方式:可以在这里拿到route,如果是home就不管,如果是detail就执行
        //第二种解决方式:可以使用$off取消全局事件监听(在组件销毁的时候监听)
        /*const refresh = debounce(this.$refs.scroll.refresh, 200);
        this.itemImgListener = () => {
          refresh()
        }
        this.$bus.$on('everyImgLoad',this.itemImgListener );*/
      },
      updated(){
        // this.itemY = [];
        // this.itemY.push(0);
        // this.itemY.push(this.$refs.params.$el.offsetTop);
        // this.itemY.push(this.$refs.comment.$el.offsetTop);
        // this.itemY.push(this.$refs.list.$el.offsetTop);
      },
      destroyed() {
        // 2、取消全局事件监听
       /* console.log('取消了全局事件监听');
        this.$bus.$off('everyImgLoad', this.itemImgListener);*/
      },
      methods:{
        addToCart(){
          //1、获取购物车需要展示的信息加入购物车
          const product = {};
          product.count = 1;
          product.image = this.detailSwiperImg[0];
          product.title = this.goods.title;
          product.desc = this.goods.discountDesc;
          product.price = this.goods.lowNowPrice;
          product.iid = this.iid;
          product.realPrice = this.goods.realPrice;
          //2.先将处理数据的逻辑交给action处理,acting中在交给mutation处理
          //返回一个promise对象,可以通过回调函数的形式,知道具体结果
          this.$store.dispatch("addCart",product).then(res =>{
            this.$toast(res)
            // this.isFlag = true;
            // this.message = res;
            // setTimeout(() =>{
            //   this.isFlag = false;
            // },2500)
          })
        },
        imageLoad(){
          this.$refs.scroll.refresh()
          //offsetTop的获取在这里执行
          //我们已经进行了防抖处理
          this.setItemY()
        },
        detailBtn(index){
          //this.$refs.scroll.scrollTo(0,-index * 1000,100)
          this.$refs.scroll.scrollTo(0,- (this.itemY[index]),100)
        },
        itemPosition(position){
          const contentY = -position.y
          // console.log(contentY)
          for(let i =0;i<this.itemY.length-1;i++){
            if(this.itemY[i] <= contentY && contentY < this.itemY[i+1]){
              this.$refs.nav.currentIndex = i
              break
            }
          }
          this.isShow = contentY > 1000;
        }
      }
    }
</script>
<!--重点在于如何获取到三个组件的offsetTop
   1.created肯定不行,压根不能获取到元素
   2.mounted也不行,数据还没有获取到
   3.获取到数据的回调getDetail方法中也不行,DOM还没有渲染完
   4.$nextTick也不行,因为图片的高度没有被计算在内
   5.在图加在完成的监听中,获取到的高度才是正确的
-->
<style scoped>
  #detail {
    /*让让它脱标,让它在tabBar的上面*/
    position: relative;
    z-index: 99;
    /*给个背景颜色让用户看不到tabBar*/
    background-color: #fff;
    /*这里一定要设置高度*/
    height: 100vh;
  }
  .scroll {
    position: relative;
    /*这里也要设置高度*/
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  .bottom {
    position: relative;
    /*bottom: 49px;*/
    z-index: 99;
    right: 0;
    left: 0;
  }
</style>
