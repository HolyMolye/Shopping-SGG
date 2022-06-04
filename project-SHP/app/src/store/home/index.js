//这个是home模块的小仓库
//vuex实现模块式开发
//如果项目过大，组件过多，接口也很多，数据也很多，可以让vuex实现模块式开发
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"//拿到之前在api里封装好的axios向服务器发请求

//三连环写完之后，需要在组建里面触发才有效果
//而getFloorList这个action在哪里触发，是需要在Home路由组件当中发的，千万不能在Floor组件里面触发
//因为mock下的floor.json文件返回的是两个对象，Floor需要v-for遍历复用一次，Floor无法再自己的组件里面遍历复用自己
//所以要在Floor的父组件Home组件下触发
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象就写对象，返回数组就写数组。【根据接口返回值初始化的】
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    floorList: []

}
const mutations = {
    //通过actions从服务器返回的数据，替换掉原先的数据
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        console.log('修改仓库当中的数据')
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        console.log('修改仓库当中的数据')
        state.floorList = floorList
    }

}
const actions = {
    //通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
    async reqCategoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        // console.log('获取服务器的数据')
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }

    },
    //获取Floor数据
    async getFloorList({ commit }) {
        //console.log('获取服务器的数据')
        let result = await reqFloorList()
        if (result.code == 200) {
            //提交mutation
            commit("GETFLOORLIST", result.data)
        }

    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
