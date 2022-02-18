<template>
  <div class="container">
    <div class="loading" v-if="isLoading">
      <img src="@/assets/loading.png" />
    </div>
    <div class="error" v-if="error">
      error
    </div>
    <div class="shop" v-if="data">
      <shopHeader class="title fixed" :name="data.name"></shopHeader>
      <div class="info">
        <div class="shop-name">{{ data.name }}</div>
        <div class="shop-else">
          商家配送约{{ averageTime }}分钟·月售{{ data.sales }}
        </div>
        <div class="shop-bulletin">公告: {{ data.bulletin }}</div>
        <div class="shop-discount">
          <!-- <red-packet
            v-for="(rp, index) in data.discount"
            :key="index"
            :rp="rp"
          ></red-packet> -->
        </div>
      </div>
      <div class="nav">
        <p @click="goto('Goods')" :class="{ active: isActive }">点餐</p>
        <p @click="goto('Comment')" :class="{ active: !isActive }">
          评价
        </p>
      </div>
      <keep-alive>
        <router-view class="iframe"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
// import Cart from "@/components/cart.vue";
import shopHeader from "@/components/shop-header.vue";
import redPacket from "@/components/shop-redPacket.vue";

export default {
  data() {
    return {
      loading: false,
      error: null,
      shopID: "shopid",
      showing: "Goods",
      data: null
    };
  },
  computed: {
    // 不知道距离和时间的具体算法,随便写了一个
    averageTime() {
      let result =
        this.data.distance / 100 > 20 ? this.data.distance / 100 : 20;
      return result.toFixed(0);
    },
    localCart() {
      return this.$store.state.cartList[this.shopID];
    },
    isActive() {
      return this.showing === "Goods" ? true : false;
    },
    route() {
      return this.$route.path;
    },
    isLoading() {
      // 当没有数据时,状态为loading
      return this.loading && this.data === null;
    }
  },
  created() {
    this.fetchData();
  },
  components: {
    shopHeader,
    // eslint-disable-next-line vue/no-unused-components
    redPacket
  },
  beforeRouteUpdate(to, form, next) {
    this.fetchData();
    next();
  },
  watch: {
    route() {
      this.fetchData;
    }
  },
  methods: {
    goto(val) {
      this.showing = val;
      if (this.$route.path.indexOf(val) === -1) {
        this.$router.push(val);
      }
    },
    fetchData() {
      this.loading = true;
      this.$axios({
        url: "/api/shopInfo",
        method: "post",
        data: {
          id: this.$route.params.id
        }
      })
        .then(res => {
          this.data = res.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.loading
  height 100vh
  width 100%
  img
    display block
    margin 40vh auto
    height 3rem
    width 3rem
    animation rotated 1.5s ease-out infinite
@keyframes rotated {
  0% {
    transform rotate(0)
  }
  100% {
    transform rotate(360deg)
  }
}
.fixed
  position fixed
  background-color deepskyblue
  top 0
  left 0
  right 0
  bottom calc(100vh - 2.5em)
.info
  margin .5em
  margin-top 3em
  padding .5em
  border-radius 10px
  .shop-name
    font-size 1.2rem
    font-weight bold
    margin-bottom .5rem
  .shop-else
    font-size .8rem
    font-weight bold
    margin-bottom .5rem
  .shop-bulletin
    color grey
    font-size .8rem
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    margin-bottom .5rem
  .shop-discount
    margin-bottom .5rem
.nav
  display flex
  flex-direction row
  height 1.5rem
  background-color rgb(240,240,240)
  padding .5rem
  line-height 1.5rem
  p
    line-height 1.6rem
    margin-right 1rem
    font-size 1.2rem
    font-weight bold
    span
      font-size .5rem
.active
  border-bottom 2px solid deepskyblue
</style>
