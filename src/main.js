import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import FastClick from 'fastclick'
import vueLazyLoad from "vue-lazyload";

import toast from "./components/common/toast";
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()

//给vue的原型添加$toast属性,方便拿到这个函数
Vue.prototype.$toast = toast

//使用fastclick解决移动端300ms延迟的问题(npm install fastclick --save)
FastClick.attach(document.body)

//使用vue-lazyload插件来懒加载图片,用户往下滑再显示图片
//use方法会去调用vueLazyLod插件的install方法
//img标签中src要用v-lazy代替
Vue.use(vueLazyLoad,{
  //里面可以填各种配置
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
