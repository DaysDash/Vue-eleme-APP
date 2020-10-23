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
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide otherPage">
          <div v-for="n in 8" :key="n">
            <img src="@/assets/foo.png" />
          </div>
        </div>
        <div class="swiper-slide">
          <div v-for="n in 8" :key="n">
            <img src="@/assets/foo.png" />
          </div>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
    <!-- 商铺列表 -->
    <div class="shopList">
      <div class="sort">
        <div
          @click="sortList('default')"
          :class="{ active: sortType === 'default' }"
        >
          默认排序
        </div>
        <div
          style="margin-left: 5px"
          @click="sortList('distance')"
          :class="{ active: sortType === 'distance' }"
        >
          距离排序
        </div>
        <div
          style="margin-left: 5px"
          @click="sortList('sales')"
          :class="{ active: sortType === 'sales' }"
        >
          销量排序
        </div>
      </div>
      <template v-if="sortedShopList">
        <shopInfo
          v-for="item in sortedShopList"
          :shop="item"
          :key="item.id"
        ></shopInfo>
      </template>
      <div id="sentinel"></div>
      <transition name="slide">
        <div v-if="showBtn" class="fixedBtn">
          <div class="goTop"><i class="iconfont icon-gouwuche"></i></div>
          <div class="goTop" @click="goTop()">
            <i class="icon iconfont icon-shangfan"></i>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  background-color white
  margin 0
  height calc(100vh - 2.5rem)
  overflow scroll
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
    background-color #fff
  .active
    color deepskyblue
.fixedBtn
  position fixed
  bottom 2.5rem
  right .5rem
  z-index 999
  .goTop
    height 3rem
    width 3rem
    text-align center
    border-radius 50%
    background-color #fff
    box-shadow 1px 1px 10px rgba(0, 0, 0, .2)
    margin-bottom 5px
    i
      font-size 2rem
      line-height 3rem
#sentinel
  min-height .1rem
.slide-enter-active, .slide-leave-active
  transition all .5s
.slide-enter, .slide-leave-to
  transform translateX(5rem)
</style>

<script>
// @ is an alias to /src
import shopSearch from "@/components/shop-search.vue";
import shopInfo from "@/components/shop-info.vue";
import "swiper/swiper-bundle.css";
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);

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
      sortedShopList: [],
      interval: "",
      sortType: "default",
      showBtn: false
    };
  },
  components: {
    shopSearch,
    shopInfo
  },
  methods: {
    sortList(val = "default") {
      this.sortType = val;
      switch (val) {
        case "distance":
          this.sortedShopList = this.$store.getters.distance;
          break;
        case "sales":
          this.sortedShopList = this.$store.getters.sales;
          break;
        default:
          this.sortedShopList = this.$store.state.shopList;
          break;
      }
    },
    goTop() {
      document.querySelector(".container").scrollTo(0, 0);
      this.showBtn = false;
    }
  },
  mounted() {
    this.sortList();
    new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination"
      },
      speed: 200,
      loop: true
    });
    // 无限滚动 但是添加了60数量的限制
    let sentinel = document.querySelector("#sentinel");
    var intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      if (this.$store.state.shopList.length > 50) {
        return;
      }
      let a = this.$store.state.shopList.length;
      let load = document.createElement("p");
      load.innerHTML = "加载中";
      sentinel.appendChild(load);
      this.$axios({
        method: "get",
        url: "/api/shoplist",
        data: {
          a: a
        }
      }).then(res => {
        sentinel.removeChild(load);
        this.$store.commit("updateShopList", res.data);
        this.sortedShopList = this.$store.state.shopList;
      });
    });
    intersectionObserver.observe(sentinel);
    //页面位置监听
    this.interval = setInterval(() => {
      if (this.$route.path != "/msite/home") return;
      let height = document.querySelector(".container").scrollTop;
      if (height > 1000) {
        this.showBtn = true;
      } else {
        this.showBtn = false;
      }
    }, 1000);
  },
  // 滚动到离开页面时的位置
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.sortList(to.meta.sortType);
      document.querySelector(".container").scrollTo(0, to.meta.height);
    });
  },
  // 记录离开时的位置和分类信息
  beforeRouteLeave(to, from, next) {
    from.meta.sortType = this.sortType;
    from.meta.height = document.querySelector(".container").scrollTop;
    this.showBtn = false;
    next();
  }
};
</script>
