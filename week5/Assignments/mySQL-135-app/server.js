const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const commentRouter = require('./routes/commentRouter')
const issueRouter = require ('./routes/issueRouter')
const expressJwt = require('express-jwt')
require('dotenv').config()
const PORT = 9000


main().catch(err => console.log(err))
async function main () {
    await mongoose.connect('mongodb://localhost:27017/inventorydb')
    console.log("Connected to the DB")
}

app.use(express.json())
app.use(morgan('dev')) 


app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms:['sha1', 'RS256', 'HS256'] })) // req.user
app.use('/', authRouter)
app.use('/api/Comment', commentRouter)
app.use('/api/Issue', issueRouter)


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