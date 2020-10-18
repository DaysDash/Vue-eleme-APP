<template>
  <div class="rp-container">
    <div class="rp-amount" :class="type">
      <small>&yen;</small>{{ rp.amount }}
      <div class="rp-condition">
        {{ rp.condition }}
      </div>
    </div>
    <div class="rp-gm" :class="type">
      {{ getMethod }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rp: {
      type: Object
    }
  },
  computed: {
    type() {
      if (this.rp.type === 0) {
        return "vip";
      } else {
        return "common";
      }
    },
    getMethod() {
      if (this.rp.getMethod === 1) {
        return "领";
      } else {
        return "兑";
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.rp-container
  display inline-flex
  flex-direction row
  margin-right 10px
  .rp-amount
    display flex
    height 1.5rem
    padding 0 .3rem
    font-weight bold
    line-height 1.5rem
    border-radius 1.5px
    border-right .9px dashed
    .rp-condition
      margin 0 5px
      font-weight normal
      font-size .7rem
  .rp-gm
    font-size .7rem
    padding 0 .3rem
    line-height 1.5rem
    border-radius 1.5px
    text-align center
.vip
  background-color gold
  color brown
.common
  background-color red
  color white
</style>
