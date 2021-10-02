<template>
    <div id="check-btn" :class="{isCheck:checked}" >
      <img src="~assets/image/cart/true.svg" alt="">
    </div>
</template>

<script>
    export default {
      name: "CheckBtn",
      props:{
        checked:{
          type:Boolean,
          default:true
        }
      }
    }
</script>

<style scoped>
  #check-btn {
    border: 1px solid #6e6e6e;
  }
  #check-btn img {
    height: 20px;
    width: 20px;
  }
   .isCheck {
    background-color: var(--color-high-text);
    border: 0
  }
</style>
