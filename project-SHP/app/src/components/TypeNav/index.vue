<template>
    <div class="type-nav">
        <div class="container">
            <!-- 事件委派|事件代理 -->
            <h2 class="all" @mouseleave="leaveShow" @mouseenter="enterShow">全部商品分类</h2>
            <!-- 三级联动 -->
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- 过渡动画:前提是组件|元素务必要有v-if|v-show指令才可以进行过度动画 -->
            <transition name="sort">
                <div class="sort" @click="goSearch" v-show="show">
                    <!-- 利用事件的委派+编程式导航实现路由的转跳与传递参数 -->
                    <div class="all-sort-list2">
                        <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId">
                            <h3>
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName
                                }}</a>
                                <!-- <a @click="goSearch">{{c1.categoryName}}</a> -->
                            </h3>
                            <!-- 二级、三级分类 -->
                            <!--三级联动的路由转跳与传递参数
                        三级联动用户可以点击的：一级分类、二级分类、三级分类，当你点击时
                        Home模块转跳到Search模块，一级会把用户选中的产品（产品的名字、产品的id）在路由转跳的时候，进行传递

                        路由跳转：
                        声明式导航：router-link
                        编程时导航：push | replace
                        -->
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                                    c2.categoryName
                                            }}</a>
                                            <!-- <a @click="goSearch">{{c2.categoryName}}</a> -->
                                            <!-- 编程式导航转跳，但也不是最优解，因为要为每个a标签绑定gosearch转跳函数，事件的委派是最优解 -->
                                            <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                                            <!-- 声明式导航 26笔记缺-->
                                        </dt>
                                        <dd>
                                            <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName"
                                                    :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                <!-- <a @click="goSearch">{{c3.categoryName}}</a> -->
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

        </div>
    </div>
</template>

<script>
//三级联动组件
//---由于三级联动，在Home、Search、Detail，把三级联动注册全局组件
//好处：只需要注册一次，就可以在项目任意地方使用
import { mapState } from "vuex"
export default {
    name: 'TypeNav',
    data() {
        return {
            show: true//显示组件
        }
    },
    //组件挂在完毕后：可以向服务器发请求
    mounted() {
        /*        
        //通知vuex发请求，获取数据，存储于仓库当中
        this.$store.dispatch('categoryList')
                */
        //当组件挂载完毕，让show属性变为false
        //如果不是Home路由组件，将typeNav进行隐藏
        if (this.$route.path != '/home') {
            this.show = false

        }
    },
    computed: {
        ...mapState({
            //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            //注入一个参数state，其实即为大仓库中的数据
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        /*        //鼠标进入修改相应式数据currentIndex属性
                changeIndex(index){
                    //index:鼠标移上某一个一级分类的索引值
                    this.currentIndex = index
                }
        */
        goSearch(event) {
            //最好的解决方案：编程式导航 + 事件委派
            //利用事件委派存在一些问题：1.确定点击的一定是a标签？ 2.如何获取参数【1、2、3级分类的产品的名字、id】？
            //事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父节点
            //点击a标签时，才会进行路由转跳【怎么能确定点击的一定是a标签】
            //存在另一个问题：即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签

            //第一个问题：把子节点当中的a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
            let element = event.target
            //获取到当前触发这个节点【h3、a、dt、dl】，需要带有data-categorname这样的节点【一定是a标签】
            //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } = element.dataset
            //如果标签身上拥有categoryname则一定是a标签
            if (categoryname) {
                //整理路由转跳的参数
                let location = { name: "search" }
                let query = { categoryName: categoryname }
                //一级分类、二级分类、三级分类的a标签
                if (category1id) {
                    query.category1id = category1id

                } else if (category2id) {
                    query.category2id = category2id

                } else {
                    query.category3id = category3id

                }
                //判断：如果路由转跳的时候，带有params参数，捎带脚传递过去
                if (this.$route.params) {
                    location.params = this.$route.params
                    //动态给location配置对象添加query属性
                    location.query = query
                    //路由转跳
                    this.$route.push(location)
                }

            }

        },

        //当鼠标移入的时候，让商品分类列表进行展示
        enterShow() {
            if (this.$route.path != '/home') {
                this.show = true

            }

        },
        //当鼠标离开的时候，让商品分类列表进行隐藏
        leaveShow() {
            this.currentIndex = -1
            if (this.$route.path != '/home') {
                this.show = false

            }
        }
    },
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }

                /* //通过给二级菜单添加hover属性来实现鼠标移到二级菜单背景颜色就变蓝的效果
                .item:hover{
                    background: skyblue;
                }
                */
            }
        }

        //过渡动画的样式
        //过渡动画开始状态（进入）
        .sort-enter {
            height: 0px;
        }

        //过渡动画结束状态（进入）
        .sort-enter-to {
            height: 461px;
        }

        //定义动画时间、速率
        .sort-enter-active {
            transition: all .1s linear;
        }
    }
}
</style>