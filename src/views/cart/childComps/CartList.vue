<template>
    <div id="CartList">
      <cart-list-item v-for="item in $store.state.cartList" :carts="item" />
    </div>
</template>

<script>
    import CartListItem from "./CartListItem";
    export default {
      name: "CartList",
      components:{
        CartListItem
      }
    }
</script>

<style scoped>

</style>
