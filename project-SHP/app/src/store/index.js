//vuex状态管理库
//vuex是什么？
//vuex是一个官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据。
//切记，并不是全部项目都需要vuex，如果项目很小，完全不需要vuex，如果项目很大，组件很多、数据很多，数据维护很费劲，vuex
//state mutations actions getters modules

import Vue from "vue";
import Vuex from 'vuex';
//需要使用插件一次
Vue.use(Vuex)
//引入小仓库
import home from "./home";
import search from "./search";
/*
//state:仓库存储数据的地方
const state = {}
//mutations:修改state的唯一手段
const mutations = {}
//actions:处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}
*/

//对外暴露store类的一个实例
export default new Vuex.Store({
  /*  state,
    mutations,
    actions,
    getters,
    */
   //实现vuex仓库模块式开发存储数据
   modules:{
       home,
       search,
   }

})