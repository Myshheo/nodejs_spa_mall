const express = require("express");
const router = express.Router();

// Cart와 Goods의 schema 가져오기
const Cart = require("../schemas/cart");
const Goods = require("../schemas/goods");


// localhost:3000/api/carts GET METHOD
// 장바구니에 있는 데이터 조회
router.get('/carts', async(req,res)=>{

    // cart안에 있는 정보를 carts에 할당하여 가져오기
    const carts = await Cart.find({});
    // [{goodsId, quantity}]로 존재

    // goodsIds에 carts속 배열에 goodsId만 가져와서 배열로 받음.
    // mongoose 안에서 find를 쓰는 것.
    const goodsIds = carts.map((cart)=>{return cart.goodsId});

    // Goods schema에 있는 모든 정보를 가져와서
    // 만약 goodsIds 변수(배열)에 있는 값일 경우만 조회해서 goods에 할당해줌.
    const goods = await Goods.find({goodsId: goodsIds})


    // cart라는 배열에 담긴 값들을 모두 돌아서
    // quantity는 cart에서 가져오고, goods의 데이터는 goods라는 배열에서 조건을 걸어서 찾음.
    const results = carts.map((cart)=>{
        return {
            "quantity": cart.quantity,
            "goods": goods.find((item)=>item.goodsID === cart.goodsId)
        }
    })

    res.json({
        "carts": results
    })
});

// carts.js를 router로 module화해서 exports하게 해줌.
module.exports = router;