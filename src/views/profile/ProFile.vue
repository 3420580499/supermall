<template>
  <div id="profile">
    <div>我的</div>
    <toast :flag="true" message="购物车"></toast>
  </div>

</template>

<script>
  import Toast from "../../components/common/toast/Toast";
  export default {
    name: "ProFile",
    components:{
      Toast
    }
}
</script>

<style scoped>

</style>
