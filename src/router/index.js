import Vue from "vue";
import VueRouter from "vue-router";
import Msite from "../views/Msite/Msite.vue";
import Home from "../views/Msite/children/Home.vue";
const Order = () => import("../views/Msite/children/Order/Order.vue");
const Mine = () => import("../views/Msite/children/Mine.vue");
const Search = () => import("../views/Search.vue");
const Shop = () => import("../views/Shop/Shop.vue");
const Goods = () => import("../views/Shop/children/Goods.vue");
const Comment = () => import("../views/Shop/children/Comment.vue");

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
        component: Order
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
