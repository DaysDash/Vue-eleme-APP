<template>
  <div>
    <keep-alive>
      <router-view class="msite"></router-view>
    </keep-alive>
    <Navbar class="navbar"></Navbar>
  </div>
</template>

<style lang="stylus" scoped>
.navbar
  position fixed
  z-index 100
  bottom 0
  left 0
  right 0
</style>

<script>
import Navbar from "@/components/navbar.vue";

export default {
  components: {
    Navbar
  }
};
</script>
