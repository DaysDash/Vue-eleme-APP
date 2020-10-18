<template>
  <div class="container">
    <span @click="$router.push('/')">
      <i class="iconfont icon-xiangzuojiantou"></i>
    </span>
    <span v-if="isSearch">
      <div>
        <input type="text" v-model="serachValue" />
        <button>
          <i class="iconfont icon-sousuo"></i>
        </button>
      </div>
    </span>
    <span v-else>
      {{ name }}
    </span>
  </div>
</template>

<style lang="stylus" scoped>
.container
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  height 2rem
  padding .5rem
  span
    line-height 1.5em
    div
      display flex
      flex-direction row
      input
        height  1.5em
        width 80vw
</style>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  computed: {
    isSearch() {
      return this.$route.path === "/search";
    },
    name() {
      let name = this.$route.path;
      return name;
    },
    serachValue: {
      get() {
        return this.$store.state.serachValue;
      },
      set(val) {
        this.$store.commit("updateValue", val);
      }
    }
  }
};
</script>
