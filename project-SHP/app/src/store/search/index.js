//这个是search模块的小仓库
//vuex实现模块式开发
//如果项目过大，组件过多，接口也很多，数据也很多，可以让vuex实现模块式开发

//执行vuex小仓库
import { reqGetSearchInfo } from "@/api"
//search模块的仓库
const state = {
    //仓库初始状态
    searchList:{}//不能瞎写，要看服务器传回来的数据格式，如果不知道到可以先向服务器发请求测试一下数据格式
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    //获取search模块数据
    async getSearchList({commit},params = {}){
        //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit("GETSEARCHLIST",result.data)
        }
    },
}
//计算属性，在项目当中，为了简化数据而生
const getters = {
    //当形参state，是当前仓库中的state，并非大仓库中的那个state
    goodsList(state){
        //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        //假如网络不给力|没有网state.searchList.goodsList返回的就是undefined
        //但是返回的必须是一个数组，因为要遍历，undefined不能遍历，所以要加一个||[]来确保它返回的一定是一个数组
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}
