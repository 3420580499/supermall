<template>
  <div id="app">
    <!--因为每一个detail组件都不一样的,我们不能从缓存中拿取,否则会导致每一个detail都一样-->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/mainTabbar/MainTabBar";
  export default {
     name: 'App',
     components:{
       MainTabBar
     }
  }
</script>

<style>
 @import "assets/css/base.css";
</style>
