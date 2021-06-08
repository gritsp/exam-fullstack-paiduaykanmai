const express = require('express')

const productDB = require('../models/productDB')

const router = express.Router()

router.post('/', async (req,res) =>{
    // res.send({name:req.body.name})
    var db = await productDB.find()
    // console.log(db)
    if (db.length>0){
        var index = db.length-1
        console.log(index)
        var id = parseInt(db[index].id.substr(1,4))+1
        var newId = "P"+id.toString().padStart(4,"0") 
    }
    else{
        var newId = "P0001"
    }
    // newID = "S0001"
    const product = new productDB({
        _id: newId,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        unit:req.body.unit,
        category:req.body.category
    })

    product.save()
        .then(result =>{
            res.send(
                {
                    massage: 'Well done',
                    data: result
                }
            )
        })
        .catch(err => console.log(err))
    // res.send("hi")
})

router.get('/', async (req,res) => {
    productDB.find()
        .then(product =>{
            res.send({
                massage:"done",
                data: product
            })
        })
        .catch(err=>console.log(err))
})

router.get('/:id', (req,res) => {
    const productId = req.params.id
    productDB.findById(productId)
        .then(product =>{
            res.send(product)
        })
        .catch(err=>console.log(err))
    
})

router.put('/:id', (req,res) => {

    const productId = req.params.id
    productDB.findById(productId)
        .then(product =>{
            product._id = product._id,
            product.name = req.body.name,
            product.description = req.body.description,
            product.price= req.body.price,
            product.unit = req.body.unit,
            product.category = req.body.category

            return product.save()
        })
        .then(result =>{
            res.send(result)
        })
        .catch(err=>console.log(err))
})

router.delete('/:id', (req,res) => {
    const productId = req.params.id
    productDB.findByIdAndDelete(productId)
        .then(
            res.send("Deleted")
        )
        .catch(err=>console.log(err))
})

module.exports = router