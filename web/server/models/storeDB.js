const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    _id:String,
    name:String,
    description:String,
    tel:String,
    address:String,
    data:String
})

module.exports = mongoose.model('storeDB',storeSchema)