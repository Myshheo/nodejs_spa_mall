const express = require("express");
const app = express();
const port = 3000;

//goods.js module을 가져오는 것.
const goodsRouter = require("./routes/goods");
const cartsRouter = require("./routes/carts");

//connect라는 변수를 index.js에서 가져오고 실행.
const connect = require("./schemas")
connect();

//아직 이해 못함.
app.use(express.json());
app.use("/api", [goodsRouter, cartsRouter]);


//localhost의 3000포트에서 get 발생 시 res로 "hello, World!"를 출력함.
app.get('/', (req,res) => {
  res.send("Hello,World!");
});

//listen method를 통해서 3000포트로 들어오는 요청을 받는 것.
app.listen(port, () =>{
  console.log(port,"포트가 정상적으로 열렸어요!");
});

// 수정사항 테스트