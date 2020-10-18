<template>
  <div class="order-info">
    <div class="order-shop">
      <div class="img">
        <img src="order.shop.avatar" />
      </div>
      <div class="order-shop-info">
        <div>{{ order.shop.name }}</div>
      </div>
    </div>
    <div class="order-food" v-for="(food, index) in order.foods" :key="index">
      <div class="food-img">
        <img src="food.img" />
      </div>
      <div class="food-info">
        {{ food.name }}
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.order-info
  background-color #fff
  margin .5rem
  border-radius 5px
  box-shadow 1px 1px 5px rgba(0,0,0,.2)
  padding .5rem
  .order-shop
    display flex
    flex-direction row
    line-height 3rem
    .img
      img
        margin-right 5px
        height 3rem
        width 3rem
        boreder-radius 5px
    .order-shop-info
      font-weight 900
  .order-food
    display flex
    flex-direction row
    padding-left calc(3rem + 5px)
    .food-img
      img
        height 4rem
        width 4rem
        margin-right 5px
    .food-info
      line-height 4rem
</style>

<script>
export default {
  props: {
    order: {
      type: Object
    }
  }
};
</script>
