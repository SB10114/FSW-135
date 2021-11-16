const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const inventoryRouter = require('./routes/inventoryRouter')
const PORT = 9000


main().catch(err => console.log(err))
async function main () {
    await mongoose.connect('mongodb://localhost:27017/inventorydb')
    console.log("Connected to the DB")
}

app.use(express.json())
app.use(morgan('dev')) 

app.use('/Inventory', inventoryRouter)

app.use((err, req, res, next) => {
    if(err.name === 'Unauthorized error'){
        res.status(err.status)
    }
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(PORT, () => {
    console.log(`App started on port: ${PORT}`)
});