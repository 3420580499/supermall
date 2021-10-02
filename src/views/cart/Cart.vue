<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车（{{cartLength}}）</div>
    </nav-bar>
    <Scroll class="content" ref="scroll" :probe-type="3">
       <cart-list/>
    </Scroll>
    <cart-bottom/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";
  import CartList from "./childComps/CartList";
  import CartBottom from "./childComps/CartBottom";
  import { mapGetters } from 'vuex';
  export default {
    name: 'Cart',
    components: {
      NavBar,
      Scroll,
      CartList,
      CartBottom
    },
    computed: {
      //使用这种语法可以将vuex中的 getters中的方法移到这里来
      ...mapGetters(['cartList', 'cartLength']),
    },
    //当购物车组件活跃时,我们要进行一次refresh
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
  .cart-nav {
    background: var(--color-tint);
    color: #fff;
  }
</style>
