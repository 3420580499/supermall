<template>
    <div class="toast">
      <div v-show="flag" class="inBox">{{message}}</div>
    </div>
</template>

<script>
    export default {
      name: "Toast",
      props:{
        flag:{
          type :Boolean,
          default: false
        },
        message:{
          type: String,
          default: ''
        }
      }
    }
</script>

<style scoped>
  .toast {
    border-radius: 7px;
    padding:4px 6px;
    font-size: 14px;
    color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,.65);
  }
</style>
