//mongoose와 연결
const mongoose = require("mongoose");

//5~16번째 줄 코드는 defaultSchema를 작성하는 코드.
//mongoose에서  defaultSchema 형태로 선언.
// const defaultSchema = new mongoose.Schema({
//   defaultId: {
//     // required는 필수, unique는 고유한 값인가? 를 묻는 것이며 true일 시 작동.
//     type: Number,
//     required: true,
//     unique: true
//   }
// });

//defaults라는 모델 명으로 defaultSchema를 사용.
// module.exports = mongoose.model("Defaults", defaultSchema);

//defaultsSchema를 토대로 goodsSchema를 작성.
const goodsSchema = new mongoose.Schema({
    goodsId: {
      // required는 필수, unique는 고유한 값인가? 를 묻는 것이며 true일 시 작동.
      type: Number,
      required: true,
      unique: true
    },
    name :{
      type: String,
      required: true,
      unique: true
    },
    thumbnailUrl:{
        type: String
    },
    category : {
        type: String  
    },
    price : {
        type: Number
    }
  });
  
module.exports = mongoose.model("Goods", goodsSchema);