<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header"
import Footer from "./components/Footer"

export default {
  name: "App",
  components: {
    Header,
    Footer
    
  },
  mounted() {
    //通知vuex发请求，获取数据，存储于仓库当中
    //派发action
    //这行代码原本是写在TypeNav下的index.vue的mounted中的
    //改写到App的原因是，TypeNav是全局组件，但是在Home和Search中转跳会销毁上一个页面，TypeNav也要重新向服务器请求一次数据
    //但是导航栏的数据请求一次和请求多次的结果是一样的，因此反复向服务器后台接口发请求会造成系统资源的浪费，性能下降
    //不过因为App是只执行一次的，所有把这个代码写在App的生命周期钩子里就能够解决这一问题，优化代码
    this.$store.dispatch('categoryList')
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
