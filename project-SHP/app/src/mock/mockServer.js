//json.cn网址可在线解析json文件
//服务器返回的数据（接口）只有商品分类菜单分类数据，对于ListContainer组件与floor组件数据库服务器没有提供
//mock数据（模拟）：如果你想mock数据，需要用到一个mock.js插件https://docschina.org/
//使用步骤：
//在项目中src文件夹创建mock文件
//第二步准备JSON数据（在mock文件夹中创建相应的JSON文件）---格式化一下，若留有空格是跑不起来的
//把mock数据需要的图片置放到pubilc文件夹中，pubilc文件夹会在打包的时候，把相应的资源原封不动打包到dist文件夹中
//创建mockServer.js通过mock插件实现模拟数据
//mockServer.js文件在入口文件中引入（至少需要执行一次，才能模拟数据）

//先引入mockjs模块
import Mock from "mockjs";
//把JSON数据格式引
//webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

//mock数据：第一个参数请求地址      第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})//模拟首页大的轮播图
Mock.mock("/mock/floor",{code:200,data:floor})
