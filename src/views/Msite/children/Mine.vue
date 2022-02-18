<template>
  <div class="mine">
    <header>
      <div class="user-icon">
        <img src="@/assets/defaultAvatar.jpg" />
      </div>
      <div class="user-info">
        {{ user.name }}
      </div>
      <div class="app-set">
        <i class="iconfont icon-shezhi"></i>
        <i class="iconfont icon-xiaoxizhongxin"></i>
      </div>
    </header>
    <main>
      <Card class="common-functions" title="常用功能">
        <div>
          <div class="icon"><i class="iconfont icon-wodehongbao"> </i></div>
          <div>红包卡券</div>
        </div>
        <div>
          <div class="icon"><i class="iconfont icon-jushoucang"> </i></div>
          <div>店铺关注</div>
        </div>
        <div @click="$router.push('/cart')">
          <div class="icon"><i class="iconfont icon-gouwuche"> </i></div>
          <div>购物车</div>
        </div>
      </Card>
      <Card class="user-balance" title="我的钱包">
        <div>
          <p>借钱</p>
          <p>10万</p>
          <p>最高可借</p>
        </div>
        <div>
          <p>联名卡</p>
          <p>720元</p>
          <p>开卡最高领</p>
        </div>
        <div>
          <p>享优惠</p>
          <p>157元</p>
          <p>绑卡立减</p>
        </div>
      </Card>
      <Card class="more" title="更多推荐">
        <div>
          <div class="icon">
            <i class="iconfont icon-customer-service"> </i>
          </div>
          <div>我的客服</div>
        </div>
        <div>
          <div class="icon"><i class="iconfont icon-shouhuodizhi"> </i></div>
          <div>我的地址</div>
        </div>
        <div>
          <div class="icon">
            <i class="iconfont icon-naozhong"></i>
          </div>
          <div>
            点餐提醒
          </div>
        </div>
        <div>
          <div class="icon">
            <i class="iconfont icon-liwu"></i>
          </div>
          <div>推荐有奖</div>
        </div>
      </Card>
    </main>
  </div>
</template>

<script>
import Card from "@/components/card.vue";

export default {
  data() {
    return {
      user: {
        img: null,
        name: "Rondom",
        balance: 20.4
      }
    };
  },
  components: {
    Card
  }
};
</script>

<style lang="stylus" scoped>
.mine
  height 100vh
  background-color rgb(250, 250, 250)
  header
    background-color #fff
    display flex
    padding .5rem
    flex-direction row
    .user-icon
      margin-right 1rem
      img
        border-radius 50%
        height 4rem
        width 4rem
    .user-info
      font-size 1.5rem
      font-weight bold
      line-height 4rem
    .app-set
      margin-right 0
      margin-left auto
      i
        font-size 1.5rem
        color #000
        margin-right 15px
</style>
