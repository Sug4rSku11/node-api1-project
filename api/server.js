// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
//Instant of express app
const server = express()
//Global Middleware
server.use(express.json())

//POST new user "CREATE" /api/users ***Works***
server.post('/api/users', async (req, res) => {
    try{
        if(!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        }else{
            const newUser = await User.insert(req.body)
        res.status(201).json(newUser)
        }
        
    }catch(err){
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})
//GET all users Get /api/users ***Works***
server.get('/api/users', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err) {
        res.status(500).json({
            message: "The users information could not be retrieved",
            error: err.message
        })
    }
})
//GET by ID--  specific id Get /api/users/:id ***Works**
server.get('/api/users/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }else{
            res.json(user)
        }
    }catch(err){ 
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }
})

//DELETE -- specific id Delete /api/users/:id ***Works***
server.delete('/api/users/:id', async (req, res) => {
    try{
        const possibleUser = await User.findById(req.params.id)
        if(!possibleUser) {
            res.status(404).json ({ message: "The user with the specified ID does not exist"})
        }else {
            const deletedUser = await User.remove(req.params.id)
            res.status(200).json(deletedUser)
        }
    }catch (err){
        res.status(500).json({ message: "The user could not be removed", err: err.message})
    }
        })
    

//UPDATE-- specific user Put /api/users/:id
server.put('/api/users/:id', async (req, res) => {
    try{
        const possibleUser = await User.findById(req.params.id)
        if(!possibleUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        }else{
            if (!req.body.name || !req.body.bio){
                res.status(400).json({ message: "Please provide name and bio for the user"})   
            }else{
                const updatedUser = await User.update(req.params.id , req.body)
                res.status(200).json(updatedUser)
            }
        }
    }catch(err){
        res.status(500).json ({ message: "The user information could not be modified", err: err.message})
    }
})



module.exports = server // EXPORT YOUR SERVER instead of {}
