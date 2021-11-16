const express = require('express')
const Inventory = require('../models/inventory')
const inventoryRouter = express.Router()


//GET all
inventoryRouter.get("/", (req, res, next) => {
    Inventory.find((err, inventory) => {
        if(err){
            res.status(500)
            return next(err)
        } else {
            return res.status(200).send(inventory)
        }
    })
})

//GET one
inventoryRouter.get("/:inventoryId", (req, res, next) => {
    const findItem = req.params.inventoryId
    Inventory.findOne({_id: findItem}, (err, inventoryItem) => {
        if (err) {
            res.status(500)
            return next(err)
        } else {
            return res.status(201).send(inventoryItem)
        }
    })
})

//Delete
inventoryRouter.delete("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndDelete(
      {_id: req.params.inventoryId}, 
      (err, deletedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted item from the database`)
      }
    )
  })

  //Post 
  inventoryRouter.post("/", (req, res, next) => {
    const newItem = new Inventory(req.body)
    newItem.save((err, savedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedItem)
    })
  })

  //Put
  inventoryRouter.put("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndUpdate(
      { _id: req.params.inventoryId},
      req.body,
      {new: true},
      (err, updatedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedItem)
      }
    )  
  })

module.exports =  inventoryRouter;