//我们可以使用另一种致方式使用toast
//这种方法的原理:在HTML中生成一个class为toast的div,我们要在base.css中定义好样式,把这个函数导出
//这种方式不是安装插件的方式
export default function toast(str) {
  const div = document.createElement('div')
  div.innerText = str
  div.className = 'toast'
  document.body.appendChild(div)

  let timer = setTimeout(function () {
    document.body.removeChild(div)
    clearTimeout(timer)
  }, 2500)
}
