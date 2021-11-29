// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
//Instant of express app
const server = express()
//Global Middleware
server.use(express.json())

//Create new user Post /api/users
server.post('/api/users', async (req, res) => {
    try{
        if(!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        }else{
            const newUser = await User.create(req.body)
        res.status(201).json(newUser)
        }
        
    }catch(err){
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})
//Returns all users Get /api/users
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
//Returns specific id Get /api/users/:id
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

//Removes specific id Delete /api/users/:id

//Updates specific user Put /api/users/:id
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try{
        const updated = await User.update(id, body)
        if(!updated){
            res.status(404).json ({
                message: "The user with the specified ID does not exist"
            })
        }else{
            res.json(updated)
        }
        if(!updated){
            res.status(404).json ({
                message: "The user with the specified ID does not exist"
            })
        }else{
            res.json(updated)
        }
        if(!req.body.name || !req.body.bio){
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        }else{
            res.json(updated)
        }

    }catch (err) {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})



module.exports = server // EXPORT YOUR SERVER instead of {}
