const Mock = require("mockjs");
const Random = Mock.Random;
Mock.setup({
  timeout: "300"
});

Mock.mock("/api/shop", () => {
  let list = [];
  for (let i = 0; i < 10; i++) {
    let listObject = {
      id: Random.id(),
      img: Random.image("100x100"),
      name: Random.ctitle(),
      sales: Random.integer(0, 10000),
      rate: Random.float(1, 4, 0, 1),
      deliverFee: Random.integer(0, 20),
      distance: Random.integer(1000, 5000),
      evalution: Random.csentence(5, 8),
      discount: `满${Random.integer(10, 30)}减${Random.integer(3, 9)}`,
      minPrice: Random.integer(10, 30)
    };
    list.push(listObject);
  }
  return list;
});
// "array|10": [
//     {
//       "id|+1": 1,
//       img: Random.image("100x100"),
//       name: Random.ctitle(),
//       sales: Random.integer(0, 10000),
//       rate: Random.float(0, 5, 0, 1),
//       deliverFee: Random.integer(0, 20),
//       distance: Random.integer(1000, 5000),
//       evalution: Random.csentence(5, 8),
//       discount: /满\d0减\d/,
//       minPrice: Random.integer(10, 30)
//     }
//   ]
