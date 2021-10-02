import debounce from "./debounce";

//混入的作用就是将两个组件中公共的代码放到一起
export const itemListener = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      this.refresh()
    };
    this.$bus.$on('everyImgLoad', this.itemImgListener);
    console.log('mounted混入操作');
  }
}
//抽取home和detail组件中返回顶部按钮的公共的代码
export const publicMaster = {
  data(){
   return {
     isShow :false
   }
  },
  methods:{
    btnClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}
