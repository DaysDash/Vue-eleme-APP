<template>
  <div class="shop-search">
    <!-- <input type="text" @focus="$router.push('/search')" />
    <button @click="$router.push('/search')">
      <i class="iconfont icon-sousuo"></i>
    </button> -->
    <div class="input" @click="$router.push('/search')">
      <i class="iconfont icon-sousuo"></i>
      <div class="search">搜索</div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.shop-search
  background-color #fff
  padding .5em
.input
  background-color rgb(225, 225, 225)
  display flex
  justify-content space-between
  height 1.8rem
  border-radius 2em
  padding .25rem
  i
    width 2rem
    color grey
    font-size 1.2rem
    text-align center
    line-height 1.8rem
  .search
    background-color deepskyblue
    width 4rem
    font-size 1rem
    height 1.3rem
    line-height 1.3rem
    text-align center
    border-radius 1.3rem
    color white
    padding .2em
</style>

<script>
export default {
  data() {
    return {
      value: ""
    };
  }
};
</script>
