(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ed0efd4c"],{3576:function(e,t,i){"use strict";var s=i("d840"),r=i.n(s);r.a},"4b22":function(e,t,i){"use strict";var s=i("6c6c"),r=i.n(s);r.a},"6c6c":function(e,t,i){},"9e2a":function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"order"},[e.isLogged?i("div",[e._m(0),i("nav",[i("div",{class:{active:"all"===e.isActive},on:{click:function(t){return e.getOrder("all")}}},[e._v(" 全部 ")]),i("div",{class:{active:"obligation"===e.isActive},on:{click:function(t){return e.getOrder("obligation")}}},[e._v(" 待消费 ")]),i("div",{class:{active:"comment"===e.isActive},on:{click:function(t){return e.getOrder("comment")}}},[e._v(" 待评价 ")]),i("div",{class:{active:"refund"===e.isActive},on:{click:function(t){return e.getOrder("refund")}}},[e._v(" 退款 ")])]),i("main",e._l(e.orders,(function(e,t){return i("OrderInfo",{key:t,attrs:{order:e}})})),1)]):i("div",[e._v("请登录")])])},r=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("header",[e._v(" 订单 "),i("i",{staticClass:"iconfont icon-sousuo"})])}],n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"order-info"},[i("div",{staticClass:"order-shop"},[i("div",{staticClass:"img"},[i("img",{attrs:{src:e.order.shop.avatar}})]),i("div",{staticClass:"order-shop-info"},[i("div",[e._v(e._s(e.order.shop.name))])])]),e._l(e.order.foods,(function(t,s){return i("div",{key:s,staticClass:"order-food"},[i("div",{staticClass:"food-img"},[i("img",{attrs:{src:t.icon}})]),i("div",{staticClass:"food-info"},[e._v(" "+e._s(t.name)+" ")]),i("div",{staticClass:"food-price"},[i("p",[e._v("¥"+e._s(e.order.totalPrice))]),i("p",[e._v("共"+e._s(e.num)+"件")])])])}))],2)},c=[],o={props:{order:{type:Object}},computed:{num:function(){return this.order.foods.length}}},a=o,d=(i("4b22"),i("2877")),l=Object(d["a"])(a,n,c,!1,null,"23ee9dba",null),u=l.exports,v={data:function(){return{isLogged:!0,isActive:"all",orders:[{shop:{avatar:"https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg",name:"示例一"},foods:[{icon:"http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",name:"南瓜粥",price:9,num:1}],state:"complete",totalPrice:9}]}},components:{OrderInfo:u},methods:{getOrder:function(e){this.isActive=e}}},f=v,m=(i("3576"),Object(d["a"])(f,s,r,!1,null,"369039fa",null));t["default"]=m.exports},d840:function(e,t,i){}}]);