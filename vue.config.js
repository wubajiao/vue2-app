/*
 * @Descripttion : 
 * @Author       : wuhaidong
 * @Date         : 2024-03-10 20:17:10
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-07-02 21:22:13
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)            // 文件名必须要xxx.worker.js
      .use('worker')
      .loader('worker-loader')
  }
})
