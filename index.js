// only file that run in the backend
// 1) import dotenv 
require('dotenv').config() // enviroment variable will be added to process .env file
// 2) import express
const express = require('express')
// 3) import cors
const cors = require('cors')
// 4) import router
const router = require('./router')
// 5) import mongoDB
    require('./db/connection')
// create server 
const chefAiServer = express()

// use cors to connect with server
chefAiServer.use(cors())
// json() - middlw - to convert json formate object
chefAiServer.use(express.json())

chefAiServer.use(router)

chefAiServer.use('/uploads',express.static('./uploads'))
const PORT = 5000 || process.env

chefAiServer.listen(PORT,()=>{
    console.log(`ChefAI server running at PORT number :${PORT}`);
})