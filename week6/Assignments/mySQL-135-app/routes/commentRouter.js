const express = require('express')
const Comment = require('../models/Comments')
const commentRouter = express.Router()


//GET all
commentRouter.get("/", (req, res, next) => {
    Comment.find((err, Comment) => {
        if(err){
            res.status(500)
            return next(err)
        } else {
            return res.status(200).send(Comment)
        }
    })
})

//GET one
commentRouter.get("/:CommentId", (req, res, next) => {
    const findItem = req.params.CommentId
    Comment.findOne({_id: findItem}, (err, CommentItem) => {
        if (err) {
            res.status(500)
            return next(err)
        } else {
            return res.status(201).send(CommentItem)
        }
    })
})

//Delete
commentRouter.delete("/:CommentId", (req, res, next) => {
    Comment.findOneAndDelete(
      {_id: req.params.CommentId}, 
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
  commentRouter.post("/", (req, res, next) => {
    const newItem = new Comment(req.body)
    newItem.save((err, savedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedItem)
    })
  })

  //Put
  commentRouter.put("/:CommentId", (req, res, next) => {
    Comment.findOneAndUpdate(
      { _id: req.params.CommentId},
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

module.exports =  commentRouter;