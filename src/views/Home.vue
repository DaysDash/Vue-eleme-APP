<template>
  <div class="container">
    <header>
      <div class="addresss">
        <i class="iconfont icon-shouhuodizhi"></i>
        定位地址
      </div>
      <i class="iconfont icon-xiaoxizhongxin"></i>
    </header>
    <div class="shop-search">
      <shop-search></shop-search>
    </div>

    <!-- 其它分类 -->
    <!-- vue-awesome-swiper swiper6.x的pagination无法显示 -->
    <!-- <div class="swiper-container">
      <swiper class="swiper" :options="swiperOptions">
        <swiper-slide>1</swiper-slide>
        <swiper-slide>2</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide otherPage">
          <div v-for="n in 8" :key="n">
            <img src="../assets/loading.png" />
          </div>
        </div>
        <div class="swiper-slide">
          <div v-for="n in 8" :key="n">
            <img src="../assets/loading.png" />
          </div>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
    <!-- 商铺列表 -->
    <div class="shopList">
      <div class="sort">
        <div>综合排序</div>
        <div>全部分类</div>
      </div>
      <shopInfo v-for="item in shoplist" :shop="item" :key="item.id"></shopInfo>
      <div class="ph"></div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  background-color white
  margin 0
header
  display flex
  flex-direction row
  justify-content space-between
  color white
  padding .5em
  font-size 1.2rem
  background-color deepskyblue
  i
    font-size 1.3rem
.shop-search
  z-index 999
  position sticky
  top 0
.swiper-container
  background-color #fff
  height 12em
  .swiper-slide
    display flex
    justify-content space-evenly
    flex-wrap wrap
    align-content start
    div
      width 22vw
      img
        height 5em
        width auto
.shopList
  .sort
    padding .5em
    display flex
    position sticky
    top 3em
    background-color #fff
  .ph
    height calc(2em + 3vw)
</style>

<script>
// @ is an alias to /src
import shopSearch from "@/components/shop-search.vue";
import shopInfo from "@/components/shop-info.vue";
// import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
// import Swiper from "swiper";

export default {
  name: "Home",
  data() {
    return {
      shoplist: [
        {
          id: 1,
          name: "示例1",
          img: "http://lorempixel.com/90/90/food/1",
          sales: 200,
          distance: "10km",
          minPrice: 30,
          deliverFee: 6,
          rate: 1,
          evalution: "很好吃",
          discount: "满30减10"
        },
        {
          id: 2,
          name: "示例2",
          img: "http://lorempixel.com/100/100/food/2",
          sales: 200,
          distance: "4km",
          minPrice: 20,
          deliverFee: 0,
          rate: 2.5,
          evalution: "很好吃",
          discount: "满30减10"
        },
        {
          id: 3,
          name: "示例3",
          img: "http://lorempixel.com/100/100/food/3",
          sales: 500,
          distance: "1km",
          minPrice: 40,
          deliverFee: 6,
          rate: 4.3,
          evalution: "很好吃",
          discount: "满30减10"
        },
        {
          id: 4,
          name: "示例4",
          img: "http://lorempixel.com/100/100/food/4",
          sales: 500,
          distance: "1km",
          minPrice: 40,
          deliverFee: 6,
          rate: 4.3,
          evalution: "很好吃",
          discount: "满30减10"
        },
        {
          id: 5,
          name: "示例5",
          img: "http://lorempixel.com/100/100/food/5",
          sales: 500,
          distance: "1km",
          minPrice: 40,
          deliverFee: 6,
          rate: 4.3,
          evalution: "很好吃",
          discount: "满30减10"
        }
      ],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true
      }
    };
  },
  components: {
    shopSearch,
    shopInfo
    // Swiper,
    // SwiperSlide
  },
  mounted() {
    new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination"
      },
      speed: 200,
      loop: true
    });
  }
  // directives: {
  //   swiper: directive
  // }
};
</script>
