//npm install postcss-px-to-viewport --save-dev
//这个插件可以将我们的px单位装换为vw和vh进行移动端适配
//有插件也可以实现rem的转换
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,  // 视窗的宽度，对应的是我们设计稿的宽度.
      viewportHeight: 667, // 视窗的高度，对应的是我们设计稿的高度.(也可以不配置)
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['tab-bar','ignore'], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
      mediaQuery: false ,// 不允许在媒体查询中转换`px`
      exclude:[/TabBar/] //排除
    },
  }
}
