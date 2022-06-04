<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再使用component引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- Floor这个组件：自己在组件内部是没有发请求的，数据是父组件给的 -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
//引入其余的组件--非全局组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'

//组件间的通信方式有哪些?面试频率极高
//props：用于父子组件通信
//自定义事件：@on @emit 可以实现子给父通信
//全局事件总线：$bus 全能
//pubsub-js:vue当中几乎不用 全能
//插槽
//Vuex
export default {
  name: "",
  //非全局组件就需要在component下注册才可以使用
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    //派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList")
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
};
</script>

<style lang="scss" scoped>
</style>

