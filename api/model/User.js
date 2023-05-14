
const mongoose =require('mongoose')

const {Schema} = mongoose

// 模型创建
const UserSchema = new Schema({
  name:String,
  email:{
    type:String,
    unique:true
  },
  password:String
})

// User数据
const UserModel = mongoose.model('User',UserSchema)

module.exports = UserModel