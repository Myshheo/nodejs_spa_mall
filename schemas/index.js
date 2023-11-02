//mongodb와 mongoose를 연결하기 위한 코드
const mongoose = require("mongoose");

//connect 코드를 통해서 "mongodb://"를 통해서 연결할 db 선택
const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/spa_mall")

    //에러 발생 시 console.log로 출력
    .catch(err => console.log(err));
};

// mongoose로 connection 시도 에러가 발생 되면 출력.
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

//mongoose로 connection을 시도(on) 되었을 때 "connected가 되면" 출력.
mongoose.connection.on("connected", () => {
    console.log("몽고디비 연결 성공");
  });

//connect 익명함수를 exports
module.exports = connect;