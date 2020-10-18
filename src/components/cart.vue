<template>
  <div class="cart">
    <i class="iconfont icon-gouwuche"></i>
    <div>
      <p v-if="totalPrice === 0">未选购商品</p>
      <p v-else>&yen;{{ totalPrice }}</p>
      <p>另需配送费 &yen;{{ shop.deliverFee }}</p>
    </div>
    <div>
      {{ pay }}
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.cart
  display flex
</style>

<script>
export default {
  props: {
    shop: {
      type: Object
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.$store.state.cartList.map(food => {
        total += food.price;
      });
      return total;
    },
    pay() {
      if (this.$store.state.cartList.length === 0) {
        return `¥ ${this.shop.minPrice}起送`;
      } else {
        if (this.totalPrice <= this.shop.minPrice) {
          return `还需${this.totalPrice - this.shop.minPrice}元`;
        } else {
          return "去结算";
        }
      }
    }
  }
};
</script>
