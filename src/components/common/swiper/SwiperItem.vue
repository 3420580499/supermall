<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Slide"
  }
</script>

<style scoped>
  .slide {
    width: 100%;
    /*四个slide的宽度已经超出了,这里定义flex-shrink为0,表示不会被压缩*/
    flex-shrink: 0;
  }
  .slide img {
    width: 100%;
  }
</style>
