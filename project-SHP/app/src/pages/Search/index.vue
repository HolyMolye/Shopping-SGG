<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑，带有x的结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 如果有搜索的关键字，才显示面包屑，没有就不显示，点击‘X’能删除该面包屑 -->
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">x</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <!-- trademark的数据是"2:苹果"这种形式的，但是我们只需展示：后面的“苹果”字样，所以要用split进行切割 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i
                @click="removeTradeMark">x</i>
            </li>
            <!-- 平台的售卖的属性值的展示 -->
            <!-- 因为props中的数据是一个数组，展示在面包屑的话得遍历，所以不能单纯的用v-if展示，要用v-for遍历 -->
            <!-- attrValue的数据是"属性ID:属性值:属性名"这种形式的，但是我们只需展示属性名，所以要用split进行切割 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{ attrValue.split(":")[1]
            }}<i @click="removeAttr(index)">x</i>
            </li>

            <!--面包屑---下面的是死数据
            <li class="with-x">iphone<i>×</i></li>
            <li class="with-x">华为<i>×</i></li>
            <li class="with-x">OPPO<i>×</i></li>
            -->
          </ul>
        </div>

        <!--selector-->
        <!-- 给子组件绑定自定义事件进行子组件与父组件的传参 @自定义事件名称="自定义事件的回调" -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="#">综合<span v-show="isOne" class="iconfont"
                      :class="{ 'icon-xialajiantouxiao': isDesc, 'icon-shouqijiantouxiao': isAsc }"></span></a>
                </li>
                <!--
                <li :class="{ active: searchParams.order.indexOf('1') != -1 }">
                  <a href="#">综合</a>
                </li>
                -->
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <!--
                <li :class="{ active: searchParams.order.indexOf('2') != -1 }">
                  <a href="#">价格⬆</a>
                </li>
                -->
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a href="#">价格<span v-show="isTwo" class="iconfont"
                      :class="{ 'icon-xialajiantouxiao': isDesc, 'icon-shouqijiantouxiao': isAsc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img src="./images/mobile01.png" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <img :src="good.defaultImg" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
//search模块开发？
//1.先静态页面 + 静态组件拆分出来
//2.发请求（API）
//3.vuex（三连环）
//4.组件获取仓库数据，动态展示数据
import SearchSelector from './SearchSelector/SearchSelector'
//import { mapState } from 'vuex'

export default {
  name: 'Search',

  components: {
    SearchSelector
  },
  data() {
    return {
      //带给服务器参数
      searchParams: {
        //一级分类的id
        "category1Id": "",
        //二级分类的id
        "category2Id": "",
        //三级分类的id
        "category3Id": "",
        //分类名字
        "categoryName": "",
        //关键字
        "keyword": "",
        //排序:初始状态应该是综合|降序
        "order": "1:desc",
        //分页器用的：代表当前是第几页
        "pageNo": 1,
        //代表的是每一个展示数据个数
        "pageSize": 10,
        //平台售卖属性操作带的参数
        "props": [],
        //品牌
        "trademark": ""
      },
    }
  },

  //当组件挂载完毕之前执行一次【先与mounted之前】|可以在发送请求之前将带有参数进行修改
  beforeMount() {
    //复杂的写法
    //this.searchParams.category1Id = this.$store.query.category1Id
    //this.searchParams.category2Id = this.$store.query.category2Id
    //this.searchParams.category3Id = this.$store.query.category3Id
    //this.searchParams.categoryName = this.$store.query.categoryName
    //this.searchParams.keyword = this.$store.params.keyword
    //Object.assign：ES6新增的语法，合并对象
    //在发送请求之前，把接口需要传递的参数进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params)

  },

  mounted() {
    //先测试接口返回的数据格式
    //最终的search派发不能写在这，因为mounted是生命周期函数，只会执行一次
    //而search是要多次触发的，所以要写在计算属性methods中
    //this.$store.dispatch('getSearchList', {})

    this.getData()
  },

  computed: {
    /*...mapState({
      goodsList: state => state.search.searchList.goodsList
    })*/

    //mapGetters里面的写法：传递的数组，因为getters计算是没有划分模块【home，search】
    ...mapGetters(['goodsList']),

    //判断是否该显示综合还是价格的高亮
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    }
  },

  methods: {
    //向数服务器发送请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    //把这次请求封装为一个函数，当你需要在调用时调用即可
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams)
    },

    //删除分类的名字
    removeCategoryName() {
      //把带给服务器的参数置空了，还需要向服务器发请求
      //带给服务器的参数说明是可有可无的：但如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段变为undefined，那么当前这个字段就不会带给服务器
      //this.searchParams.categoryName = ''
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()//删除参数后重新向服务器发请求，返回新的数据
      //地址栏也需要更新：进行路由转跳
      //严谨：本意是删除query，如果路径当中出现params不应该删除，路由转跳的时候应该带着
      if (this.$route.params) {
        this.$route.push({ name: "search", params: this.$route.params })
      }
    },
    //删除关键字
    removeKeyword() {
      //给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined
      //再次发请求
      this.getData()
      //通知兄弟组件Header清楚关键字(使用全局事件总线，要现在main.js中引入配置)
      this.$bus.$emit("clear")
      //进行路由的转跳
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query })
      }

    },
    //自定义事件回调
    trademarkInfo(trademark) {
      //父组件通过自定义事件，子组件$emit给父组件拿到数据后，要对数据进行整理（trademark）
      //1.整理品牌字段的参数  "ID：品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`//为data里面的searchParams中的"trademark"字段赋值
      //再次发送请求获取search模块列表数据进行展示
      this.getData()
    },

    //删除品牌的关键字
    removeTradeMark() {
      //给服务器带的参数searchParams的trademark置空
      this.searchParams.trademark = undefined
      //再次发请求
      this.getData()
    },
    //收集平台属性地方回调函数(自定义事件)
    attrInfo(attr, attrValue) {
      //["属性ID:属性值:属性名"]
      //参数格式整理好
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      //数组去重--赋值之前先判断数组里面有没有该元素，如果没有才push添加，防止相同的元素在面包屑重复展示
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props)//为data里面的searchParams中的"props"字段赋值
      }
      //再次发请求
      this.getData()
    },
    //删除售卖的属性
    removeAttr(index) {
      //再次整理数据，删除数组中的某一个元素
      this.searchParams.props.splice(index, 1)//(要删除数组的索引值，个数)
      //再次发请求
      this.getData()
    },
    //排序的操作
    changeOrder(flag) {
      //flag形参：它是一个标记，代表用户点击的是综合（1）价格（2）[用户点击的时候传递进来的]
      let originOrder = this.searchParams.order
      //这里获取到的是最开始的状态
      let originFlag = this.searchParams.order.splice(":")[0]
      let originSort = this.searchParams.order.splice(":")[1]
      //准备一个新的order属性值
      let newOrder = ""
      //点击的是综合
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`
      } else {
        //点击的是价格
        newOrder = `${flag}:${"desc"}`
      }
      //将新的order赋予searchParams
      this.searchParams.order = newOrder
      //再次发请求
      this.getData()
    }

  },

  watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      //再次发起请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      //再次发起ajax请求
      this.getData()
      //每一次请求发送完毕，应该把相应的1、2、3级分类的id置空，让他接受下一次相应的1、2、3id
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined

    }
  }
}
/*
小重点：排序操作--排序并不需要前端进行计算，只需把数据带回数据库，后端进行计算再把计算后的结果带回给前端接受就可以了
1：综合，2：价格  asc：升序，desc：降序
示例："1：desc"

1.1问题
order属性的属性值最多有多少种写法：
1:asc
1:desc
2:asc
2:desc

1.2考虑的问题
谁应该有类名：通过order属性值当中是包含1(综合)|包含2(价格)

*/
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>