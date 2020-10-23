<template>
  <div class="comment">
    <!-- <template v-if="trys"> -->
    <commentInfo
      v-for="(item, index) in trys"
      :key="index"
      :obj="item"
    ></commentInfo>
    <!-- </template> -->
  </div>
</template>

<style lang="stylus" scoped>
.comment
  height calc(100vh - 5.5rem)
  overflow scroll
</style>

<script>
import commentInfo from "@/components/comment-info.vue";

export default {
  data() {
    return {
      trys: null
    };
  },
  components: {
    commentInfo
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "/api/comment"
    }).then(res => {
      this.trys = res.data.comment;
    });
  }
};
</script>
