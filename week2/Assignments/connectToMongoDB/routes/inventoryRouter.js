const express = require('express')
const Inventory = require('../models/inventory')
const inventoryRouter = express.Router()

inventoryRouter.get("/", (req, res, next) => {
    console.log(inventory)
    Inventory.find((err, inventory) => {
        console.log(Inventory)
        if(err){
            console.log(err)
            res.status(500)
            return next(err)
        } else {
            return res.status(200).send(inventory)
        }
    })
})


module.exports =  inventoryRouter;