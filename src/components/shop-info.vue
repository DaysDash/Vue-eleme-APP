<template>
  <div id="container" @click="$router.push(`/shop/${shop.id}`)">
    <div class="img">
      <img :src="shop.img" />
      <div class="messageAlert" v-if="cartNumber">{{ cartNumber }}</div>
    </div>
    <div class="info">
      <div class="shopName">{{ shop.name }}</div>
      <div class="second-line">
        <div class="shop-rate">
          <span>{{ shop.rate }}分</span>
          月售{{ shop.sales }}
        </div>
        <div class="shop-distance">
          {{ averageTime }}分钟 {{ (shop.distance / 1000).toFixed(1) }}km
        </div>
      </div>
      <div class="third-line">
        起送&yen;{{ shop.minPrice }} 配送&yen;{{ shop.deliveryFee }}
      </div>
      <div class="fouth-line">
        <span>{{ shop.evalution }}</span>
      </div>
      <div class="discount">
        <span>{{ shop.discount }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shop: {
      default: {}
    }
  },
  computed: {
    // 不知道距离和时间的具体算法,随便写了一个
    averageTime() {
      let result =
        this.shop.distance / 100 > 20 ? this.shop.distance / 100 : 20;
      return result.toFixed(0);
    },
    // 购物车
    cartNumber() {
      let obj = this.$store.state.cartList[this.shop.id] || {};
      let result = 0;
      Object.values(obj).forEach(item => {
        result += Object.values(item).reduce((a, b) => a + b);
      });
      return result;
    }
  }
};
</script>
<style lang="stylus" scoped>
#container
  display flex
  box-shadow 1px -1px 10px rgba(0, 0, 0, .1), -1px 1px 10px rgba(0, 0, 0, .2)
  margin .8em .5em
  border-radius 10px
  padding 1em
  .img
    position relative
    width 6rem
    margin-right 10px
    img
      width 6rem
      height auto
      border-radius 5px
    .messageAlert
      position absolute
      width 1rem
      height 1rem
      top 0
      right 0
      line-height 1.1rem
      text-align center
      font-size .5rem
      background-color red
      color white
      border-radius 50%
  .info
    flex 1 1 auto
    div
      height 1.5rem
      line-height 1.5rem
    .shopName
      font-size 1.2rem
      font-weight bold
    .second-line
      font-size .8rem
      display flex
      flex-direction row
      justify-content space-between
      color grey
      .shop-rate
        span
          color red
    .third-line
      font-size .8rem
      color grey
    .fouth-line
      span
        font-size .8rem
        background-color rgba(255,85,0,.1)
        padding .0 1rem
        color rgb(255,85,0)
        border-radius 3px
        &::before
          content '"'
        &::after
          content '" '
    .discount
      margin-bottom 0
      span
        border 1px solid red
        border-radius 3px
        padding 2px
        font-size .8rem
        height 1.5rem
        line-height 1.5rem
        color red
</style>
