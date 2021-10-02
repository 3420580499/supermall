//防抖函数
//原理:当监听到一个图片加载事件时,我们等个delay时间,如果没有另一个图片加载事件传来,就
// 执行refresh,否则就先终止前一个refresh的执行,继续等待delay时间
//可以给delay各一个默认值
  export default function debounce(func,delay=500){
    let timer = null;
    //可变参数
    return function(...args){
      //清除定时器
      if (timer) clearTimeout(timer)
      timer = setTimeout(()=>{
        func.apply(this,args)
      },delay)
    }
  }
