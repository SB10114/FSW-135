const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String
    }, 
    price: {
        type: Number
    },
    location: {
        type: Number
    }
})

module.exports = mongoose.model("Inventory", inventorySchema)