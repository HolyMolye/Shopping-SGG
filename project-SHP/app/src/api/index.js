//当前这个模块：API进行统一管理
//项目很小：完全可以在组件的生命周期函数中发请求
//项目大：axios.get('xxx')

//跨域问题
//什么是跨域：协议、域名、端口号不同请求，称之为跨域
//http://localhost:8080/#/home ----前端项目本地服务器
//http://gmall-h5-api.atguigu.cn ----后台服务器

//解决方法：JSONP、CROS、代理

import requests from "./request";
import mockRequest from './mockAjax'

//三级联动接口
//http://gmall-h5-api.atguigu.cn  get  无参数
///api/product/getBaseCategoryList

export const reqCategoryList = () => {
    //发请求:axios发送请求返回promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => {
    //发请求:axios发送请求返回promise对象
    return mockRequest({ url: '/banner', method: 'get' })
}

//获取floor数据
export const reqFloorList = () => {
    //发请求:axios发送请求返回promise对象
    return mockRequest({ url: '/floor', method: 'get' })
}

//获取搜索模块数据 地址：/api/list  请求方式：post  参数：需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/

//当前这个函数不需要接受外部传递参数
//当前这个接口（获取搜索模块的数据，给服务器传递一个默认参数【至少是一个空对象】）
export const reqGetSearchInfo = ()=>requests({url:"/list",method:"post",data:params})

