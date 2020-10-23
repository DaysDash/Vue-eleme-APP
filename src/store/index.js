import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchValue: "",
    // 购物车列表
    cartList: {},
    // 商家列表
    shopList: []
  },
  getters: {
    distance(state) {
      const arr = [].concat(state.shopList);
      return arr.sort((a, b) => {
        return a.distance - b.distance;
      });
    },
    sales(state) {
      const arr = [].concat(state.shopList);
      return arr.sort((a, b) => {
        return b.sales - a.sales;
      });
    }
  },
  mutations: {
    // 处理表单数据的双向绑定
    updateValue(state, val) {
      state.searchValue = val;
    },
    // 购物车添加商品
    cartAddFood(state, shop) {
      let id = shop.id,
        food = shop.food,
        sort = shop.sort;
      if (!state.cartList[id]) {
        state.cartList[id] = {};
        state.cartList[id][sort] = {};
        state.cartList[id][sort][food] = 1;
      } else {
        if (!state.cartList[id][sort]) {
          state.cartList[id][sort] = {};
          state.cartList[id][sort][food] = 1;
        } else {
          if (!state.cartList[id][sort][food]) {
            state.cartList[id][sort][food] = 1;
          } else {
            state.cartList[id][sort][food] += 1;
          }
        }
      }
    },
    // 购物车删除商品
    cartDeleteFood(state, shop) {
      let id = shop.id,
        food = shop.food,
        sort = shop.sort;
      state.cartList[id][sort][food] -= 1;
      if (state.cartList[id][sort][food] === 0) {
        delete state.cartList[id][sort][food];
      }
      if (Object.keys(state.cartList[id][sort]).length === 0) {
        delete state.cartList[id][sort];
      }
      if (Object.keys(state.cartList[id]).length === 0) {
        delete state.cartList[id];
      }
    },
    // 清空购物车
    clearCart(state, id) {
      delete state.cartList[id];
    },
    // 更新商家列表
    updateShopList(state, data) {
      state.shopList = state.shopList.concat(data);
    }
  },
  actions: {},
  modules: {}
});
