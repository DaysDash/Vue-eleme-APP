import data from "../assets/data.json";

const Mock = require("mockjs");
const Random = Mock.Random;

Random.extend({
  // eslint-disable-next-line no-unused-vars
  foods: function(date) {
    var foods = data.goods;
    return this.pick(foods);
  }
});

let shopList = [];
for (let i = 0; i < 60; i++) {
  let shopInfo = {
    id: Random.increment(),
    img: Random.image("100x100"),
    name: Random.ctitle(),
    sales: Random.integer(0, 10000),
    rate: Random.float(1, 4, 0, 1),
    deliveryFee: Random.integer(0, 20),
    distance: Random.integer(1000, 5000),
    evalution: Random.csentence(5, 8),
    discount: `满${Random.integer(10, 30)}减${Random.integer(3, 9)}`,
    minPrice: Random.integer(10, 30),
    bulletin: Random.csentence(9, 10),
    goods: Random.foods()
  };
  shopList.push(shopInfo);
}

Mock.setup({
  timeout: 1000
});

Mock.mock("/api/shoplist", config => {
  let list = [];
  let obj = JSON.parse(config.body);
  list = shopList.slice(obj.a, obj.a + 10);
  return list;
});

Mock.mock("/api/comment", {
  comment: data.ratings
});

Mock.mock("/api/shopInfo", config => {
  let shopId = JSON.parse(config.body).id;
  return shopList.filter(item => item.id == shopId)[0];
});
