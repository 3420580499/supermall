import Vue from 'vue'
import VueRouter from "vue-router";
//1.安装插件
Vue.use(VueRouter)
const Home = () => import("../views/home/Home")
const Cart = () => import("../views/cart/Cart")
const CateGory = () => import("../views/category/CateGory")
const ProFile = () => import("../views/profile/ProFile")
const Detail = () => import("../views/detail/Detail")
//2.创建router
const routes =[
  {
    path:'',
      redirect:"/home"
  },
  {
    path:"/home",
      component:Home
  },
  {
    path:"/cart",
      component:Cart
  },
  {
    path:"/profile",
      component:ProFile
  },
  {
    path:"/category",
      component:CateGory
  },
  {
    path:'/detail/:iid',
      component:Detail
  }
]
const router = new VueRouter({
  routes,
  mode:'history'
})
export default router
