<template>
  <div id="home">
    <!--这里的class属性会添加到子组件里面去-->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-con tabControl1" @tabClick="tabClick" ref='tabControl1'  v-show="isTabControl"/>
    <scroll class="content" ref="scroll"  :probe-type="3" @position="position" :pull-up-load="true" @upLoad="upLoad">
      <home-swiper :banners="banners" @swiperLoad="swiperLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <!--在这里定义class属性,这样在分类或者其他地方用这个组件,就不会有这个class了-->
      <tab-control :titles="['流行','新款','精选']" class="tab-con" @tabClick="tabClick" ref='tabControl2'/>
      <!--将获取数据的方式放到计算属性中去-->
      <goods-list :goods="showGoods"/>
    </scroll>
    <top-btn @click.native="btnClick" v-show="isShow"/>
  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import TopBtn from "../../components/content/topbtn/TopBtn";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import debounce from "../../common/Util/debounce";


  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      TopBtn
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          pop:{page:0,list:[]},
          new:{page:0,list:[]},
          sell:{page:0,list:[]}
        },
        currentType:'pop',
        isShow:false,
        tabControlOffSet:0,
        isTabControl:false,
        activeY:0
      }
    },
    created() {
      console.log('home组件被创建');
      //但组件被创建出来的时候,去请求多个数据
      //将处理逻辑写到methods中去
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    destroyed() {
      console.log('home组件被销毁');
    },
    mounted() {
      //写在mounted钩子函数中,写在created中$refs.scroll可能为undefined
      //监听图片加载完成
      //通过事件总线的方式监听发出的事件
      // this.$bus.$on('everyImgLoad',()=>{
      //   this.$refs.scroll.refresh()
      // })
      //下载有这样的一个问题,如果是按上面这样写,我们就得频繁的监听图片加载事件
      //可以使用防抖函数解决这个问题
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('everyImgLoad',()=> {
        refresh()
      })
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      getHomeMultidata(){
        getHomeMultidata().then((res) =>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
          getHomeGoods(type,page).then((res) =>{
          //将第一页的数据加到list中
          //合并数组(将新数组的数据全部取出加到list中去,也可以使用for循环实现)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      },
      tabClick(index){
        switch(index){
          case 0: this.currentType = 'pop' ; break;
          case 1: this.currentType = 'new' ; break;
          case 2: this.currentType = 'sell' ; break;
        }
        //因为我们定义了两个tab-control,所以他们的index没有保持一致,这里要手动改一下currentIndex
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      btnClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      position(position){
        //判断backTop是否显示
        this.isShow = (-position.y) > 1000;
        //决定tab-control是否吸顶
        //当然如果只是这样写的话会有一些问题
        //我们可以使用第二种方法,在复制一个tabControl放在他要固定的位置
        -position.y < this.tabControlOffSet ? this.isTabControl = false : this.isTabControl = true
        //console.log(this.isTabControl);
      },
      upLoad(){
       this.getHomeGoods(this.currentType)
      },
      swiperLoad(){
        //这里的$refs.tabControl拿到的是组件对象
        //候命再加上$el就可以变为元素对象
        //拿到的值是tab-control到顶部的位置
        //这里有时会获取到456的值,不是518,可能是下面的图片也没加载出来>_<
        this.tabControlOffSet = this.$refs.tabControl2.$el.offsetTop
        //this.tabControlOffSet = 518;
        console.log(this.tabControlOffSet);
      }
    },
    //当前页面活跃时
    activated() {
      //当回到首页时,我们回到之前浏览的位置
     this.$refs.scroll.scrollTo(0,this.activeY,0)
    },
    //当前页面不活跃时
    deactivated() {
      //但我们离开首页时,我们要记录首页当前所在的位置
      //拿到的是整个滚动的Y轴位移量
      this.activeY = this.$refs.scroll.scroll.y
    }
  }
</script>
<!--这里写了scoped表示里面的样式只会用在当前组件中-->
<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 3;
  }
  #home {
    height: 100vh;
    position: relative;
    /*margin-top: 44px;*/
  }
  .tab-con {
    position: sticky;
    top: 44px;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    right:0;
    left: 0;
    overflow: hidden;
  }
  /*.isFixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }*/
  .tabControl1 {
    position: relative;
    z-index: 9;
  }
</style>
