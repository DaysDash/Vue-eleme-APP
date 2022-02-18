<template>
  <div>
    <div class="shopInfo">{{ shopName }}</div>
    <div class="foodInfo">
      {{ info }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    },
    id: {
      type: String
    }
  },
  computed: {
    shopName() {
      return this.$store.state.shopList[this.id - 1].name;
    }
  }
};
</script>
