
const mongoose = require('mongoose')

const {Schema} = mongoose

const bookingSchema  = new Schema({

  place:{type:mongoose.Schema.Types.ObjectId,require:true},
  checkIn:{type:Date,require:true},
  checkOut:{type:Date,require:true},
  name:{type:String,require:true},
  mobile:{type:String,require:true},
  price:{type:Number,require:true},
  Guests:{type:Number,require:true}



})

const BookingModel = mongoose.model('Booking',bookingSchema)

module.exports = BookingModel