// BUILD YOUR SERVER HERE
const express = require('express')
//Instant of express app
const server = express()
//Global Middleware
server.use(express.json())






module.exports = server // EXPORT YOUR SERVER instead of {}
