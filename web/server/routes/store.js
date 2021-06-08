const express = require('express')

const storeDB = require('../models/storeDB')

const router = express.Router()

router.post('/', async (req,res) =>{
    // res.send({name:req.body.name})
    var db = await storeDB.find()
    console.log(db)
    if (db.length>0){
        var index = db.length-1
        console.log(index)
        var id = parseInt(db[index].id.substr(1,4))+1
        var newId = "S"+id.toString().padStart(4,"0") 
    }
    else{
        var newId = "S0001"
    }
    const store = new storeDB({
        _id: newId,
        name:req.body.name,
        description:req.body.description,
        tel:req.body.tel,
        address:req.body.address,
        data:"N"
    })

    store.save()
        .then(result =>{
            res.send(
                {
                    message: 'Well done',
                    data: result
                }
            )
        })
        .catch(err => console.log(err))
    // res.send("hi")
})

router.get('/', async (req,res) => {
    storeDB.find()
        .then(store =>{
            res.send({
                message:"done",
                data: store
            })
        })
        .catch(err=>console.log(err))
})

router.get('/:id', (req,res) => {
    const storeId = req.params.id
    storeDB.findById(storeId)
        .then(store =>{
            res.send({
                message: "done",
                data: store
            })
        })
        .catch(err=>console.log(err))
    
})

router.put('/data/:id', (req,res) =>{
    const storeId = req.params.id
    storeDB.findById(storeId)
        .then(store =>{
            store._id = store._id,
            store.name = store.name,
            store.description = store.description,
            store.tel = store.tel,
            store.address = store.address,
            store.data =  JSON.stringify(req.body.data)

            console.log(req.body.data)
            return store.save()
        })
        .then(result => {
            res.send({
                message:"done",
                data:result
            })
            console.log(result)
        }).catch(err=>{res.send({message:err})})
})

router.put('/:id', (req,res) => {

    const storeId = req.params.id
    storeDB.findById(storeId)
        .then(store =>{
            store._id = store._id,
            store.name = req.body.name,
            store.description = req.body.description,
            store.tel = req.body.tel,
            store.address = req.body.address,
            store.data = req.body.data

            return store.save()
        })
        .then(result =>{
            res.send(result)
        })
        .catch(err=>console.log(err))
})

router.delete('/:id', (req,res) => {
    const storeId = req.params.id
    storeDB.findByIdAndDelete(storeId)
        .then(
            res.send("Deleted")
        )
        .catch(err=>console.log(err))
})

module.exports = router