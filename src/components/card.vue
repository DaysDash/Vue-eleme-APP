<template>
  <div class="card-container">
    <header>
      {{ title }}
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<style lang="stylus" scoped>
.card-container
  padding .5rem
  background-color #fff
  margin .5rem
  border-radius 5px
  box-shadow 1px 1px 3px rgba(0, 0, 0, .2)
header
  font-weight 800
  margin-bottom .5rem
main
  display flex
  font-size .8rem
  flex-direction row
  justify-content space-around
  .icon
        text-align center
        margin-bottom 5px
        i
          font-size 2rem
          color deepskyblue
  p
    text-align center
    margin 5px
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "默认标题"
    }
  }
};
</script>
