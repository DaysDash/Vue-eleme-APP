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
            <img src="@/assets/loading.png" />
          </div>
        </div>
        <div class="swiper-slide">
          <div v-for="n in 8" :key="n">
            <img src="@/assets/loading.png" />
          </div>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
    <!-- 商铺列表 -->
    <div class="shopList">
      <div class="sort">
        <div>综合排序</div>
        <div style="margin-left: 5px">距离排序</div>
      </div>
      <template v-if="shopList">
        <shopInfo
          v-for="item in shopList"
          :shop="item"
          :key="item.id"
        ></shopInfo>
      </template>
      <div id="sentinel"></div>
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
  #sentinel
    height 2.5rem
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
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true
      },
      sortedShopList: []
    };
  },
  computed: {
    shopList() {
      return this.$store.state.shopList;
    }
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
    // 无限滚动 但是添加了60数量的限制
    var intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      if (this.shopList.length > 60) return;
      this.$axios({
        method: "get",
        url: "/api/shop"
      }).then(res => {
        this.$store.commit("updateShopList", res.data);
      });
    });
    intersectionObserver.observe(document.querySelector("#sentinel"));
  }
  // directives: {
  //   swiper: directive
  // }
};
</script>
