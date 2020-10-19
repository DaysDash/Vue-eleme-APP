import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Msite from "../views/Msite.vue";
import Mine from "../views/Mine.vue";
import Search from "../views/Search.vue";
import Shop from "../views/Shop.vue";
import Goods from "../views/Goods.vue";
import Comment from "../views/Comment.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/msite/home"
  },
  {
    path: "/msite",
    name: "Msite",
    component: Msite,
    children: [
      {
        path: "home",
        name: "Home",
        component: Home
      },
      {
        path: "order",
        name: "Order",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Order.vue")
      },
      {
        path: "mine",
        name: "Mine",
        component: Mine
      }
    ]
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/shop/:id",
    name: "Shop",
    redirect: "/shop/:id/goods",
    component: Shop,
    children: [
      {
        name: "Good",
        path: "goods",
        component: Goods
      },
      {
        name: "Comment",
        path: "comment",
        component: Comment
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
