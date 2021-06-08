const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id:String,
    name:String,
    description:String,
    price:Number,
    unit:String,
    category:String,
})

module.exports = mongoose.model('productDB',productSchema)