<template>
    <div class="list-container">
        <div class="sortList clearfix">
            <div class="center">
                <!--banner轮播-->
                <Carousel :list="bannerList"></Carousel>

            </div>
            <div class="right">
                <div class="news">
                    <h4>
                        <em class="fl">尚品汇快报</em>
                        <span class="fr tip">更多 ></span>
                    </h4>
                    <div class="clearix"></div>
                    <ul class="news-list unstyled">
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                    </ul>
                </div>
                <ul class="lifeservices">
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">话费</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">机票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">电影票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">游戏</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">彩票</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">加油站</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">酒店</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">火车票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">众筹</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">理财</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">礼品卡</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">白条</span>
                    </li>
                </ul>
                <div class="ads">
                    <img src="./images/ad1.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
//引包
//import Swiper from "swiper"
import Carousel from "@/components/Carousel/index.vue"
export default {
    name: "",
    mounted() {
        //mounted：组件挂载完毕，正常说组件架构（DOM）已经全有了
        //为什么swiper实例在mounted当中直接书写不可以：因为结构还没有完整，组件有v-for遍历，数据是动态的，有axios请求，需要等服务器返回数据才能遍历
        console.log("mounted");
        //派发action：通过Vuex发起ajax请求，将数据存储在仓库（Vuex中的state）中
        this.$store.dispatch("getBannerList"); //this.$store.dispatch()含有异步操作，可以向后台提交数据,格式：this.$store.dispatch('actions的方法名'，value)
        //在new Swpier实例之前，页面中结构必须得有【把new Swpier实例放在mounte这里发现不行】
        //为什么不行？结构还不完整,因为dispatch当中涉及到异步语法，导致v-for遍历的时候结构还没有完成，因此不行
        console.log("new swiper实例");
        //下面这种方法是通过为创建swiper实例添加1s的延时实现的，这样虽然可以实现功能，按时要页面刷新1s后才能操作轮播图，不是最好的解决方案
        /*        setTimeout(() => {
                    var mySwiper = new Swiper(document.querySelector(".swiper-container"), {
                        loop: true, // 循环模式选项
        
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            //点击小球的时候也切换图片
                            clickable: true,
                        },
        
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
        
                },1000)*/
    },
    computed: {
        ...mapState({
            bannerList: state => state.home.bannerList
        })
    },
    watch: {
        //最完美的解决方案，解决轮播图问题，是使用watch监听 + nextTick函数,数据监听：监听已有数据变化
        //监听bannerList数据的变化（在store/home/index.js里Vuex数据）：因为这条数据发生过变化----由空数组变为数组里面有四个元素
        /*bannerList: {
            immediate: true,
            handler(newValue, oldValue) {
                //现在咱们通过watch监听bannerList属性的属性值变化
                //如果执行handler方法，代表组件实例身上这个属性的属性值已经有了【数组：四个元素】
                //当前这个函数执行：只能保证bannerList上的数据已经有了，但是没法保证v-for已经执行结束了
                //v-for执行完毕，才有结构【你现在在watch当中是没办法保证的】
                //$nextTick：在下次DOM更新 循环结束之后 执行延迟回调。在 修改数据后 立即使用这个方法，获取更新后的DOM。
                //$nextTick：可以保证页面中的结构一定是有的，经常根很多插件一起用【都需要DOM存在了】
                this.$nextTick(() => {
                    //当你执行这个回调的时候：保证服务器数据回来了，v-for执行完毕了【轮播图的结构一定有了】
                    var mySwiper = new Swiper(
                    //document.querySelector(".swiper-container"),
                    this.$refs.mySwiper, {
                        loop: true,
                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            //点击小球的时候也切换图片
                            clickable: true,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                    });
                });
            }
        }*/
    },
 //   components: { Carousel }
}
</script>

<style lang="less" scoped>
.list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
        height: 464px;
        padding-left: 210px;

        .center {
            box-sizing: border-box;
            width: 740px;
            height: 100%;
            padding: 5px;
            float: left;
        }

        .right {
            float: left;
            width: 250px;

            .news {
                border: 1px solid #e4e4e4;
                margin-top: 5px;

                h4 {
                    border-bottom: 1px solid #e4e4e4;
                    padding: 5px 10px;
                    margin: 5px 5px 0;
                    line-height: 22px;
                    overflow: hidden;
                    font-size: 14px;

                    .fl {
                        float: left;
                    }

                    .fr {
                        float: right;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }

                .news-list {
                    padding: 5px 15px;
                    line-height: 26px;

                    .bold {
                        font-weight: 700;
                    }
                }
            }

            .lifeservices {
                border-right: 1px solid #e4e4e4;
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;

                .life-item {
                    border-left: 1px solid #e4e4e4;
                    border-bottom: 1px solid #e4e4e4;
                    margin-right: -1px;
                    height: 64px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    width: 25%;

                    .list-item {
                        background-image: url(./images/icons.png);
                        width: 61px;
                        height: 40px;
                        display: block;
                    }

                    .service-intro {
                        line-height: 22px;
                        width: 60px;
                        display: block;
                    }

                    &:nth-child(1) {
                        .list-item {
                            background-position: 0px -5px;
                        }
                    }

                    &:nth-child(2) {
                        .list-item {
                            background-position: -62px -5px;
                        }
                    }

                    &:nth-child(3) {
                        .list-item {
                            background-position: -126px -5px;
                        }
                    }

                    &:nth-child(4) {
                        .list-item {
                            background-position: -190px -5px;
                        }
                    }

                    &:nth-child(5) {
                        .list-item {
                            background-position: 0px -76px;
                        }
                    }

                    &:nth-child(6) {
                        .list-item {
                            background-position: -62px -76px;
                        }
                    }

                    &:nth-child(7) {
                        .list-item {
                            background-position: -126px -76px;
                        }
                    }

                    &:nth-child(8) {
                        .list-item {
                            background-position: -190px -76px;
                        }
                    }

                    &:nth-child(9) {
                        .list-item {
                            background-position: 0px -146px;
                        }
                    }

                    &:nth-child(10) {
                        .list-item {
                            background-position: -62px -146px;
                        }
                    }

                    &:nth-child(11) {
                        .list-item {
                            background-position: -126px -146px;
                        }
                    }

                    &:nth-child(12) {
                        .list-item {
                            background-position: -190px -146px;
                        }
                    }
                }
            }

            .ads {
                margin-top: 5px;

                img {
                    opacity: 0.8;
                    transition: all 400ms;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>