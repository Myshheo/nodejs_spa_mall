const express = require("express");
const router = express.Router();


const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
  ];
  

router.get("/goods", (req,res) => {
    res.status(200).json({goods})
});

router.get("/goods/:goodsId", (req,res)=>{
    const {goodsId} =req.params;
    
    const [result] = goods.filter((good)=>good.goodsId === Number(goodsId))

    res.status(200).json({"detail":result});
});

const Cart = require("../schemas/cart")
// post로 url cart에 넣어줄 함수를 생성하고 주소 생성.
router.post("/goods/:goodsId/cart", async (req,res)=>{
  
  //req에 각 method를 사용.
  const {goodsId} = req.params;
  const {quantity} = req.body;

  // 장바구니를 가져와서 goodsId가 있을 시 existsCarts에 넣어주고 .length method를 통해서 길이를 확인. 
  // 길이가 있을 시 res.status는 400, success는 false값, errorMessage를 작성해서 출력.
  const existsCarts = await Cart.find({goodsId});
  if (existsCarts.length) {
      return res.status(400).json({
        success : false,
      errorMessage :" 이미 장바구니에 해당하는 상품이 존재합니다.",
    })
  }
  // 만약 existsCarts.length가 false일 경우(즉, Cart 내에 존재하지 않을 경우), Cart 내부에 goodsId와 quantity를 받아와서 새로운 값을 생성, 성공 메시지를 반환.
  await Cart.create({goodsId, quantity});
  res.json({result:"success"})
});


// express의 router 속 put 함수를 활용하여서 "/goods/:goodsId/cart"라는 요청을 받을 때 put으로 아래 함수를 실행? 
router.put("/goods/:goodsId/cart", async (req,res)=>{
  // 장바구니 확인 하는 절차와 동일  
  const {goodsId} = req.params;
  const {quantity} = req.body;

  // 이번에는 CRUD 중 Update의 내용임, 따라서 existsCarts가 존재하면 error를 반환하지 않고 데이터를 처리한다.
  const existsCarts = await Cart.find({goodsId});
  // goodsId에 해당하는 값이 있을 경우 updateOne을 통해서 수정하고 싶은 객체에 {$set: {수정하고 싶은 값}}을 작성해준다.
  // 이는 put이라는 update이기에 quantity를 json형태로 받아서 이를 cart에 있는 quantity와 수정해주는 것. (맞나요?...)
  if (existsCarts.length) {
      await Cart.updateOne({goodsId: goodsId},
        {$set: {quantity: quantity}}
      )};
    res.status(200).json({success:true});
});

router.delete("/goods/:goodsId/cart", async(req,res)=>{
  const {goodsId} = req.params;
  const existsCart = await Cart.find({goodsId});

  if (existsCart.length>0){
    await Cart.deleteOne({goodsId});
  }
  res.json({results:"success"})
})

//schemas/goods의 모듈을 불러옴.
const Goods = require('../schemas/goods')

//post를 통해서 가져온 모듈을 처리한다.
router.post("/goods", async (req,res)=>{
    const {goodsId, name, thumbnailUrl, category, price} =req.body;
    
    const goods = await Goods.find({goodsId});

    if(goods.length){
      return res.status(400).json({
        success:false,
        errorMessage:"이미 존재하는 GoodsId 입니다."
      });
    }

    const createGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price});
  
    res.json({goods: createGoods});
  })

module.exports = router;
