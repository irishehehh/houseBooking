
const mongoose = require('mongoose')

const {Schema} = mongoose


const placeSchema = new Schema ({
  owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  title:String,
  address:String,
  price:Number,
  photos:{
    type:[String]
  },
  description:String,
  perks:[String],
  extraInfo:String,
  checkIn:Number,
  checkOut:Number,
  maxGuests:Number
})

  const placeModel = mongoose.model('place',placeSchema)


  module.exports = placeModel