const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    _id:String,
    name:String,
    description:String,
})

module.exports = mongoose.model('categoryDB',categorySchema)