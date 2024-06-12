// import express 
const express = require('express')

// create router - use class Router in express library
const router = new express.Router()

// import userController
const userController = require('./controllers/userController')

// import jwtMiddleWare - valid and created token
const jwtMiddleware = require('./middleware/jwtMiddleware')
// import multer - upload file controling
const multerConfig = require('./middleware/multerMiddleware')

// register route
router.post('/user/register',multerConfig.single('profileImg'),userController.userRegister)

// login route
router.post('/user/login',userController.loginRegister)

// dish generate dish
router.post('/generate-recipe',userController.generateDish)
module.exports = router