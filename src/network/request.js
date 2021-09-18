import axios from "axios"
export function request(config){
  //创建一个axios实例
    const instance1=axios.create({
      baseURL:'http://123.207.32.32:8000',
      timeout:5000
    })

    //请求时的拦截器
    instance1.interceptors.request.use(config =>{
      return config
    },err =>{
      console.log(err);
    })

    //响应时的拦截器
    instance1.interceptors.response.use(res =>{
      return res.data
    },err =>{
      console.log(err);
    })

    /*这本身就是一个promise*/
    return instance1(config)


}
