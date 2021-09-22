<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles" class="item-control"
           :class="{active:index === currentIndex}" @click="itemIndex(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "TabControl",
      props:{
        titles:{
          type:Array,
          default(){
            return []
          }
        }
      },
      data(){
        return {
          currentIndex:0
        }
      },
      methods:{
        itemIndex(index){
          this.currentIndex = index
          this.$emit('tabClick',index)
        }
      }

    }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .item-control {
    flex: 1;
  }
  .tab-control .active span{
    padding-bottom: 3px;
    color: var(--color-high-text);
    border-bottom: 4px solid var(--color-high-text);
  }
</style>
