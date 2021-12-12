const express = require('express')
const issues = require('../models/Issue')
const issueRouter = express.Router()


//GET all
issueRouter.get("/", (req, res, next) => {
    issues.find((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        } else {
            return res.status(200).send(issues)
        }
    })
})

//GET one
issueRouter.get("/:issuesId", (req, res, next) => {
    const findItem = req.params.issuesId
    issues.findOne({_id: findItem}, (err, issuesItem) => {
        if (err) {
            res.status(500)
            return next(err)
        } else {
            return res.status(201).send(issuesItem)
        }
    })
})

//GET issues by user
issueRouter.get("/user", (req, res, next) => {
  const findUserId = req.user._id
  issues.find({user: findUserId}, (err, issuesItem) => {
      if (err) {
          res.status(500)
          return next(err)
      } else {
          return res.status(201).send(issuesItem)
      }
  })
})

//Delete
issueRouter.delete("/:issuesId", (req, res, next) => {
    issues.findOneAndDelete(
      {_id: req.params.issuesId}, 
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
  issueRouter.post("/", (req, res, next) => {
    const newItem = new issues(req.body)
    newItem.save((err, savedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedItem)
    })
  })

  //Put
  issueRouter.put("/:issuesId", (req, res, next) => {
    issues.findOneAndUpdate(
      { _id: req.params.issuesId},
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

module.exports =  issueRouter;