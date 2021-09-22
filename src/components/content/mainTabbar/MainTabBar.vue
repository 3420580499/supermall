<template>
  <tab-bar>
<!-- 这里的path只是接收一个字符串,不是变量,所以不需要用v-bind-->
    <tab-bar-item path="/home" >
<!--src为html标签属性,及时加了别名也要在前面加个~号,否则加载不出图片      -->
      <img slot="item-icon" src="~assets/image/tabbar/index-0.svg"  alt=""/>
      <img slot="item-icon-active" src="~assets/image/tabbar/index-1.svg" alt=""/>
      <!--这里的代码会直接覆盖掉插槽(所以插槽要用div包裹)-->
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" >
      <img slot="item-icon" src="~assets/image/tabbar/sort-0.svg"  alt=""/>
      <img slot="item-icon-active" src="~assets/image/tabbar/sort-1.svg" alt=""/>
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" >
      <img slot="item-icon" src="~assets/image/tabbar/cart-0.svg"  alt=""/>
      <img slot="item-icon-active" src="~assets/image/tabbar/cart-1.svg" alt=""/>
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" >
      <img slot="item-icon" src="~assets/image/tabbar/mine-0.svg"  alt=""/>
      <img slot="item-icon-active" src="~assets/image/tabbar/mine-1.svg" alt=""/>
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar";
import TabBarItem from "../../common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
