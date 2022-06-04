import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
import Carousel from '@/components/Carousel'
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)

//引入mockServer.js---mock数据
import '@/mock/mockServer'

//引入swiper样式
//因为不是只有ListContainer一个组件用到swiper样式
//所以直接在main.js入口文件中引入，这样所有组件都能使用，不用一个个单独引入了
import "swiper/css/swiper.css"

//引入路由
import router from '@/router'
//引入仓库
import store from './store'

//测试
import {reqCategoryList} from '@/api'
reqCategoryList()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由：底下的写法KV一致省略V【router小写的】
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  //
  router,
  //注册仓库:组件实例的身上会多出一个属性$store属性
  store,

  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this //this是Vm
  },

}).$mount('#app')
