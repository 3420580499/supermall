<template>
  <div id="detail-navBar">
    <NavBar>
      <div slot="left" class="left" @click="goToIndex">
        <img src="~assets/image/detail/back.svg" alt="">
      </div>
      <div slot="center" class="center">
        <div v-for="(item,index) in title" class="center-four" :class="{colo:index === currentIndex}" @click="changeIndex(index)">
          <span>{{item}}</span>
        </div>
      </div>
    </NavBar>
  </div>

</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    export default {
      name: "DetailNavBar",
      components:{
        NavBar
      },
      data(){
        return {
          title: ['商品', '参数', '评论', '推荐'],
          currentIndex:0
        }
      },
      methods:{
        goToIndex(){
          this.$router.back()
        },
        changeIndex(index){
          this.currentIndex = index
        }
      }
    }
</script>

<style scoped>
  .center {
    display: flex;
  }
  .center-four {
    flex: 1;
  }
  .left {
    padding-top: 3px;
  }
  .left img {
    width: 40%;
    height: 40%;
  }
  .colo {
    color: var(--color-high-text);
  }
  .colo span {
    padding-bottom: 3px;
    border-bottom: 5px solid var(--color-high-text);
  }
  #detail-navBar {
    background-color: #f3f3f3;
  }

</style>
