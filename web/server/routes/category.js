const express = require('express')

const categoryDB = require('../models/categoryDB')

const router = express.Router()

router.post('/', async (req,res) =>{
    // res.send({name:req.body.name})
    var db = await categoryDB.find()
    // console.log(db)
    if (db.length>0){
        var index = db.length-1
        console.log(index)
        var id = parseInt(db[index].id.substr(1,4))+1
        var newId = "C"+id.toString().padStart(4,"0") 
    }
    else{
        var newId = "C0001"
    }
    // newID = "S0001"
    const category = new categoryDB({
        _id: newId,
        name:req.body.name,
        description:req.body.description
    })

    category.save()
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
    categoryDB.find()
        .then(category =>{
            res.send({
                massage:"done",
                data: category
            })
        })
        .catch(err=>console.log(err))
})

router.get('/:id', (req,res) => {
    const categoryId = req.params.id
    categoryDB.findById(categoryId)
        .then(category =>{
            res.send(category)
        })
        .catch(err=>console.log(err))
    
})

router.put('/:id', (req,res) => {

    const categoryId = req.params.id
    categoryDB.findById(categoryId)
        .then(category =>{
            category._id = store._id,
            category.name = req.body.name,
            category.description = req.body.description

            return category.save()
        })
        .then(result =>{
            res.send(result)
        })
        .catch(err=>console.log(err))
})

router.delete('/:id', (req,res) => {
    const categoryId = req.params.id
    categoryDB.findByIdAndDelete(categoryId)
        .then(
            res.send("Deleted")
        )
        .catch(err=>console.log(err))
})

module.exports = router