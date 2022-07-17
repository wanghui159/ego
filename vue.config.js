const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {    //proxy代理解决跨域
      '/api': {
        target: 'http://localhost:8989',
        changeOrigin: true,
        pathRewrite: { // 重写路径
          "^/api": ""
        }
      }
    }
  }
}
