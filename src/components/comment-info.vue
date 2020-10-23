<template>
  <div class="container">
    <div class="user-info">
      <div class="user-avatar">
        <img :src="obj.avatar" />
      </div>
      <div class="user-name">{{ obj.username }}</div>
      <div class="time">{{ obj.rateTime | getDate }}</div>
    </div>
    <div class="comment-rate">
      评分{{ obj.score }} 配送时间{{ obj.deliveryTime }}
    </div>
    <div class="comment-content">
      {{ obj.text }}
    </div>
    <div class="recommend" v-if="obj.recommend.length > 0">
      <div>推荐</div>
      <div v-for="(val, index) in obj.recommend" :key="index">{{ val }}</div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  margin 1rem .5rem
.user-info
  display flex
  flex-direction row
  div
    line-height 2rem
    height 2rem
  .time
    margin-left auto
    margin-right 0
    font-size .8rem
    color grey
  img
    height 2rem
    width 2rem
.comment-rate
  font-size .8rem
  margin .5rem 0
.comment-content
  font-size .8rem
  margin   .5rem 0
.recommend
  display flex
  flex-direction row
  flex-wrap wrap
  div:first-child
    color black
    background-color rgba(230, 230, 230, 1)
  div
    line-height 1rem
    font-size .7rem
    color deepskyblue
    padding .2rem
    border-radius 3px
    background-color rgba(12, 12, 255, .1)
    margin-right 9px
</style>

<script>
export default {
  props: {
    obj: {
      type: Object
    }
  },
  filters: {
    getDate(val) {
      let date = new Date(val);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
  }
};
</script>
