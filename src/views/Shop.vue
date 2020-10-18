<template>
  <div class="shop">
    <shopHeader class="title fixed"></shopHeader>
    <div class="info">
      <div class="shop-name">{{ data.info.name }}</div>
      <div class="shop-else">
        商家配送约{{ data.info.deliveryTime }}分钟·月售{{ data.info.sellCount }}
      </div>
      <div class="shop-bulletin">公告: {{ data.info.bulletin }}</div>
      <div class="shop-discount">
        <red-packet
          v-for="(rp, index) in data.info.discount"
          :key="index"
          :rp="rp"
        ></red-packet>
      </div>
      <!-- <div class="shop-preferential">
        <span v-for="(pf, index) in data.info.supports" :key="index">
          {{ pf.content }}
        </span>
      </div> -->
    </div>
    <div class="nav">
      <span @click="goto('Goods')">点餐</span>
      <span @click="goto('Comment')">评价{{ data.info.score }}</span>
    </div>
    <router-view class="iframe"></router-view>
  </div>
</template>

<script>
// import Cart from "@/components/cart.vue";
import shopHeader from "@/components/shop-header.vue";
import data from "@/assets/data.json";
import redPacket from "@/components/shop-redPacket.vue";

export default {
  data() {
    return {
      shopID: "shopid",
      data: data
    };
  },
  computed: {
    localCart() {
      return this.$store.state.cartList[this.shopID];
    }
  },
  components: {
    // Cart,
    shopHeader,
    redPacket
  },
  methods: {
    goto(val) {
      if (this.$route.path.indexOf(val) === -1) {
        this.$router.push(val);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
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

  height 1.5rem
  background-color rgb(240,240,240)
  padding .5rem
  span
    margin-right 2em
    font-size 1.2em
    font-weight bold
</style>
