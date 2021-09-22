<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<!--滑不动是因为图片还没有加载过来,better-scroll错误的计算了你总的内容高度,导致它以为你已经到底部了-->
<script>
  import BScroll from 'better-scroll'
    export default {
      name: "Scroll",
      data(){
        return {
          scroll:null
        }
      },
      props:{
        probeType:0,
        pullUpLoad: {
          type:Boolean,
          default:true
        }
      },
      mounted() {
          //第一个参数是元素对象,最外层的wrapper
          this.scroll = new BScroll(this.$refs.wrapper, {
            //为3时会去触发滚动事件,可以打印出滚动的位置
            probeType: this.probeType,
            pullUpLoad:this.pullUpLoad,
            //设为true才能监听点击事件
            click:true
          })
          //监听滚动事件
          this.scroll.on('scroll',(position) =>{
            //页面滚动了,将事件发射给home
            this.$emit('position',position)
          })
          //监听上拉加载事件
          this.scroll.on('pullingUp',() =>{
            this.$emit('upLoad')
          })
        },
      methods:{
        scrollTo(x,y,time=500){
          //如果是空就不调用
          this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
          this.scroll.finishPullUp()
        },
        refresh(){
          // console.log("----");
          this.scroll && this.scroll.refresh()
        }
      }
    }
</script>
<style scoped>

</style>
