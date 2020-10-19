<template>
  <div class="order">
    <div v-if="!isLogged">请登录</div>
    <div v-else>
      <header>
        订单
        <i class="iconfont icon-sousuo"></i>
      </header>
      <nav>
        <div @click="getOrder('all')" :class="{ active: isActive === 'all' }">
          全部
        </div>
        <div
          @click="getOrder('obligation')"
          :class="{ active: isActive === 'obligation' }"
        >
          待消费
        </div>
        <div
          @click="getOrder('comment')"
          :class="{ active: isActive === 'comment' }"
        >
          待评价
        </div>
        <div
          @click="getOrder('refund')"
          :class="{ active: isActive === 'refund' }"
        >
          退款
        </div>
      </nav>
      <main>
        <OrderInfo
          v-for="(order, index) in orders"
          :order="order"
          :key="index"
        ></OrderInfo>
      </main>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.order
  background-color rgb(250, 250, 250)
  min-height 100vh
header
  display flex
  justify-content spance-between
  font-size 1.2rem
  padding .5rem
  font-weight bold
  i
    font-size 1.3rem
    margin-right 0
    margin-left auto
nav
  padding 0 .5rem
  position sticky
  display flex
  flex-direction row
  top 0
  div
    margin-right 20px
    padding-bottom 4px
    &.active
      border-bottom 2px solid deepskyblue
</style>

<script>
import OrderInfo from "@/components/order-info.vue";

export default {
  data() {
    return {
      isLogged: true,
      isActive: "all",
      orders: [
        {
          shop: {
            avatar:
              "https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg",
            name: "示例一"
          },
          foods: [
            {
              icon:
                "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
              name: "南瓜粥",
              price: 9,
              num: 1
            }
          ],
          state: "complete",
          totalPrice: 9
        }
      ]
    };
  },
  components: {
    OrderInfo
  },
  methods: {
    getOrder(val) {
      this.isActive = val;
    }
  }
};
</script>
