const express = require('express')
const mongoose = require('mongoose')
const store = require('./routes/store')
const category = require('./routes/category')
const product = require('./routes/product')
const cors = require('cors')
const app = express()
app.use(cors())

require('dotenv').config()

app.use(express.json())

app.get('/' ,(req,res) => {
    res.send("Hello")
})

app.use('/api/store', store)
app.use('/api/category', category)
app.use('/api/product', product)
const port = process.env.PORT || 3000
const db = process.env.dbKey
app.listen(port, () => console.log(`Sever is running on port ${port}`))

mongoose.connect(db,{ useUnifiedTopology: true ,useNewUrlParser: true})
    .then(result =>{
        console.log("mongo connected")
    })
    .catch(err => console.log(err))