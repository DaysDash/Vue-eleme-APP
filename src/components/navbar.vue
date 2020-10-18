<template>
  <div class="navbar">
    <div>
      <router-link
        to="/msite/home"
        tag="div"
        class="navitem"
        active-class="active"
      >
        <i class="iconfont icon-shouye"></i>
        <p>首页</p>
      </router-link>
    </div>
    <div>
      <router-link
        to="/msite/order"
        tag="div"
        class="navitem"
        active-class="active"
      >
        <i class="iconfont icon-wodedingdan"></i>
        <p>订单</p>
      </router-link>
    </div>
    <div>
      <router-link
        to="/msite/mine"
        tag="div"
        class="navitem"
        active-class="active"
      >
        <i class="iconfont icon-wodejuhuasuan"></i>
        <p>我的</p>
      </router-link>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.navbar
  position absolute
  display flex
  flex-direction row
  justify-content space-around
  background-color white
  .navitem
    text-align center
    text-decoration none
    color grey
    width  33vw
    i
      font-size 1.5em
    p
      margin 0
      line-height 1em
    &.active
      color deepskyblue
</style>
