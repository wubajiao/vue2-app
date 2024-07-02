/*
 * @Descripttion : 
 * @Author       : wuhaidong
 * @Date         : 2024-03-10 20:17:10
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-07-03 00:50:39
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';  
import 'element-ui/lib/theme-chalk/index.css';  
  
Vue.use(ElementUI); 


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
