//axios二次封装
//XMLHttpRequest、fetch、JQ、axios
//为什么需要进行二次封装axios？
//请求拦截器、响应式拦截器：请求拦截器，可以在发请求之前处理一些业务、响应式拦截，当服务器数据返回以后，可以处理一些事情
//在项目中常用API文件夹【关于axios请求】

//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css"
//start:进度条开始   done：进度条结束

//1:利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径当中会出现api，相当于默认给路径添加了一个“/api”
    baseURL:"/mock",
    //代表请求超时的时间5s
    timeout:5000,
})

//请求拦截器:在发送请求之前，请求拦截器可以检测到，可以在请求发送出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性很重要，headers请求头
    //进度条开始
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器相应数据回来以后，响应式拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done()
    return res.data

},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new error('faile'))

})


//对外暴露
export default requests;
