const path = require('path')
function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
    // devServer: {
    //     proxy: "http://192.168.1.2:8888/"
    // }
    devServer: {
    host: '127.0.0.1',
    port: 8080,
        proxy: {
            '/api': {
                target: 'http://8.140.172.91:8888/',
                ws: true, // 是否启用websockets
                secure:false, // 使用的是http协议则设置为false，https协议则设置为true,
                //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
                changOrigin: true
            }
        }
  },
  chainWebpack: config => {
    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/assets/svg'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  }
}





