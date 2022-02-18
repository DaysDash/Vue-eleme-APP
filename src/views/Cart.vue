<template>
  <div>
    <shopHeader></shopHeader>
    <cart-info
      v-for="(value, key) in cartList"
      :key="key"
      :info="value"
      :id="key"
    ></cart-info>
  </div>
</template>

<script>
import shopHeader from "@/components/shop-header.vue";
import cartInfo from "@/components/cart-info.vue";

export default {
  components: {
    shopHeader,
    cartInfo
  },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    }
  }
};
</script>
