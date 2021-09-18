module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                //这个已经配好了
                // '@':'src'(路径可以用这个代替)
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }
        }
    }
}