<template>
  <div class="goods">
    <!-- 分类栏 -->
    <div class="sort">
      <div
        v-for="(item, index) in goods"
        :key="item.name"
        class="sortType"
        @click="gotoSort(index)"
        :class="{ active: isActive === item.name }"
      >
        {{ item.name }}
        <div class="messageAlert" v-if="sum(sortArray[index]) != 0">
          {{ sum(sortArray[index]) }}
        </div>
      </div>
    </div>
    <!-- 商品信息 -->
    <div id="content" class="content">
      <div v-for="(item, sortIndex) in goods" :key="item.name">
        <div class="sortName" :id="item.name" :index="sortIndex">
          {{ item.name }}
        </div>
        <div
          v-for="(food, foodIndex) in item.foods"
          :key="food.name"
          class="foodInfo"
        >
          <div class="img">
            <img :src="food.icon" />
          </div>
          <div class="else">
            <div class="foodName">{{ food.name }}</div>
            <div class="m">主要原料: {{ food.info }}</div>
            <div class="sellCount">月售: {{ food.sellCount }}</div>
            <div class="price">
              <div>&yen;{{ food.price }}</div>
              <div class="buttonGroup">
                <transition name="slide">
                  <div
                    v-if="sortArray[sortIndex][foodIndex] != 0"
                    class="deletegroup"
                  >
                    <div
                      class="cart-button delete-button"
                      @click="deleteCart(food.name, item.name)"
                    >
                      -
                    </div>
                    <div class="cart-number">
                      {{ sortArray[sortIndex][foodIndex] }}
                    </div>
                  </div>
                </transition>
                <div class="cart-button" @click="addCart(food.name, item.name)">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="blank"></div>
    </div>
    <!-- 购物车详细信息 -->
    <!-- 阻止在出现购物车信息时出现滚动 -->
    <div
      class="cart-detail"
      v-if="showCart && totalFood > 0"
      @touchmove.prevent
    >
      <div class="detail-title">
        <div>已选商品</div>
        <div @click="clearCart">清空</div>
      </div>
      <div class="detail-content">
        <template v-for="(sort, index) in sortArray">
          <template v-for="(food, foodIndex) in sort">
            <div
              v-if="food > 0"
              :key="index * 10 + foodIndex"
              class="detail-info"
            >
              <div class="detail-icon">
                <img :src="goods[index].foods[foodIndex].icon" />
              </div>
              <div class="cart-info">
                <div>{{ goods[index].foods[foodIndex].name }}</div>
                <div class="price">
                  <div style="color:red">
                    &yen;{{ goods[index].foods[foodIndex].price }}
                  </div>
                  <div class="buttonGroup">
                    <div
                      class="cart-button delete-button"
                      @click="
                        deleteCart(
                          goods[index].foods[foodIndex].name,
                          goods[index].name
                        )
                      "
                    >
                      -
                    </div>
                    <div class="detail-number">{{ food }}</div>
                    <div
                      class="cart-button"
                      @click="
                        addCart(
                          goods[index].foods[foodIndex].name,
                          goods[index].name
                        )
                      "
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div
      class="mask"
      v-if="showCart && totalFood > 0"
      @click="test()"
      @touchstart="test()"
    ></div>
    <!-- 底端购物车 -->
    <div class="cart" @click="test()" @touchmove.prevent>
      <div class="cart-icon">
        <i class="iconfont icon-gouwuche" style="font-size: 1.5em"></i>
        <div class="messageAlert" v-if="totalFood != 0">{{ totalFood }}</div>
      </div>
      <div>
        <div v-if="totalFood === 0">未选购商品</div>
        <div v-else class="totalPrice">&yen;{{ totalPrice }}</div>
        <div class="deliverPrice">另需配送费&yen;{{ shop.deliveryPrice }}</div>
      </div>
      <div class="confirm" :class="isEnough">
        {{ minPrice }}
      </div>
    </div>
  </div>
</template>

<script>
import data from "@/assets/data.json";

export default {
  data() {
    return {
      isActive: "",
      observer: "",
      cartList: {},
      sortArray: [],
      showCart: false,
      content: "",
      sortElements: ""
    };
  },
  computed: {
    shop() {
      return data.info;
    },
    goods() {
      return data.goods;
    },
    // 购物车商品总数
    totalFood() {
      let result = 0;
      this.sortArray.forEach(arr => {
        result += this.sum(arr);
      });
      return result;
    },
    // 购物车总价
    totalPrice() {
      let price = 0;
      this.sortArray.forEach((arr, sortindex) => {
        arr.forEach((num, foodindex) => {
          price += this.goods[sortindex].foods[foodindex].price * num;
        });
      });
      return price;
    },
    // 起送价格
    minPrice() {
      let spread = this.shop.minPrice - this.totalPrice;
      if (this.totalFood === 0) {
        return `￥${this.shop.minPrice}起送`;
      } else if (spread > 0) {
        return `差￥${spread}起送`;
      } else {
        return "去结算";
      }
    },
    isEnough() {
      return {
        enough: this.minPrice === "去结算"
      };
    }
  },
  methods: {
    test() {
      this.showCart = !this.showCart;
    },
    gotoSort(val) {
      // 因为ScrollIntoView和sticky结合使用有bug,所以需要先滚动到顶部再使用scrollIntoView
      this.content.scrollTo(0, 0);
      this.sortElements[val].scrollIntoView();
      this.isActive = this.goods[val].name;
    },
    sum(arr) {
      let result = 0;
      arr.forEach(val => {
        result += val;
      });
      return result;
    },
    initData() {
      this.cartList = this.$store.state.cartList[this.$route.params.id] || {};
      this.goods.forEach((item, index) => {
        let value = Object.keys(this.cartList).indexOf(item.name);
        let foodNumber = [];
        item.foods.forEach((food, index) => {
          if (
            value != -1 &&
            Object.keys(this.cartList[item.name]).indexOf(food.name) != -1
          ) {
            foodNumber[index] = this.cartList[item.name][food.name];
          } else {
            foodNumber[index] = 0;
          }
        });
        this.$set(this.sortArray, index, foodNumber);
      });
    },
    addCart(food, sort) {
      this.$store.commit("cartAddFood", {
        id: this.$route.params.id,
        food: food,
        sort: sort
      });
      this.initData();
    },
    deleteCart(food, sort) {
      this.$store.commit("cartDeleteFood", {
        id: this.$route.params.id,
        food: food,
        sort: sort
      });
      this.initData();
    },
    clearCart() {
      this.$store.commit("clearCart", this.$route.params.id);
      this.initData();
    }
  },
  beforeMount() {
    this.initData();
  },
  mounted() {
    // 减少DOM查询
    this.content = document.getElementById("content");
    this.sortElements = document.getElementsByClassName("sortName");
    // 交叉观察器
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // 当元素和滚动区域顶端相交时
          // 修改侧边食品分类的的激活状态
          if (entry.isIntersecting === true) {
            let index = parseInt(entry.target.getAttribute("index"));
            this.isActive = this.goods[index].name;
          }
        });
      },
      {
        threshold: [0],
        root: document.getElementById("content"),
        rootMargin: "0px 0px -99% 0px"
      }
    );
    Array.from(document.getElementsByClassName("sortName")).forEach(ele => {
      this.observer.observe(ele);
    });
  },
  watch: {
    // 避免清空购物车后再添加商品会直接出现购物车详情
    totalFood() {
      if (this.totalFood === 0) {
        this.showCart = false;
      }
    }
  },
  beforeDestroy() {
    this.observer.disconnect();
  } //,
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.localCart = Object.assign({}, vm.$route.cartList[vm.$route.params.id]);
  //   });
  // }
};
</script>

<style lang="stylus" scoped>
.goods
  display grid
  grid-template-columns 5em 1fr
  grid-template-rows calc(100vh - 5.5rem)
  grid-gap 5px
  .sort
    overflow scroll
    background-color rgb(240,240,240)
    .active
      background-color white
    .sortType
      position relative
      font-size .9em
      padding .5em
      div
        top 0
        right 0
  .content
    overflow scroll
    .sortName
      font-size .9em
      padding .2rem 0
      background-color white
      position sticky
      outline 1px solid white
      top 0px
    .foodInfo
      display flex
      padding 5px
      .img
        height 6rem
        margin-right 5px
        img
          width 6rem
          height 6rem
      .else
        flex 1 1 auto
        .foodName
          font-weight 400
          margin-bottom 3px
        .m, .sellCount
          margin-top .5em
          font-size .9em
          height 1em
          line-height 1em
          overflow hidden
          color #ccc
        .price
          display flex
          justify-content space-between
          margin-top .5em
          font-size 1.2em
          line-height 1.2em
          color red
          .buttonGroup
            display flex
            justify-content flex-end
            color #000
            line-height 1.5rem
            margin-right 10px
            .cart-button
              width 1.5rem
              height 1.5rem
              text-align center
              font-size 1.5rem
              line-height 1.5rem
              border-radius 50%
              font-weight bold
              background-color deepskyblue
              color white
              border deepskyblue solid 1px
            .deletegroup
              display flex
              flex-direction row
            .delete-button
              background-color #fff
              color deepskyblue
            .cart-number
              width 2rem
              text-align center
              line-height 1.5rem
              color black
    .blank
      height 8em
  .messageAlert
        position absolute
        width 1rem
        height 1rem
        line-height 1.1rem
        text-align center
        font-size .5rem
        background-color red
        color white
        border-radius 50%
  .cart-detail
    position fixed
    padding .5rem
    bottom 3rem
    z-index 999
    left 0
    right 0
    background-color #fff
    .detail-title
      display flex
      flex-direction row
      justify-content space-between
    .detail-content
      max-height 22rem
      overflow scroll
    .detail-info
      margin-bottom 3px
      padding .5rem
      display flex
      flex-direction row
      .detail-icon
        width 4rem
        height 4rem
        margin-right 5px
      img
        width 4rem
        height 4rem
      .cart-info
        flex 1 1 auto
        height 4rem
        display flex
        flex-direction column
        justify-content space-between
        .price, .buttonGroup
          display flex
          flex-direction row
          .cart-button
              width 1rem
              height 1rem
              text-align center
              font-size 1rem
              line-height 1rem
              border-radius 50%
              font-weight bold
              background-color deepskyblue
              color white
              border deepskyblue solid 1px
        .price
          justify-content space-between
          .detail-number
            width 2rem
            text-align center
          .delete-button
            background-color #fff
            color deepskyblue
  .mask
    position fixed
    top 0
    left 0
    right 0
    bottom 3rem
    background-color rgba(0, 0, 0, .5)
  .cart
    background-color white
    position fixed
    bottom 0
    left 0
    right 0
    height 3em
    display flex
    align-items center
    .cart-icon
      position relative
      margin 10px
      color deepskyblue
      font-size 1.5rem
      div
        right -.5rem
        top 0rem
    .totalPrice
      font-size 1.2rem
      font-weight bold
    .deliverPrice
      margin-top 2px
      font-size .8rem
      color grey
    .confirm
      margin-left auto
      margin-right .5rem
      background-color grey
      text-align center
      color white
      line-height 2rem
      height 2rem
      width 7rem
      border-radius 1rem
    .enough
      background-color deepskyblue
.slide-enter-active, .slide-leave-active
  transition transform .5s, opacity .3s
.slide-enter, .slide-leave-to
  transform translateX(4rem) scaleX(0)
  transform-origin left center
  opacity 0
</style>
