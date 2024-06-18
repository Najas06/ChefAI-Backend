// import express 
const express = require('express')

// create router - use class Router in express library
const router = new express.Router()

// import userController
const userController = require('./controllers/userController')

// import dishController
const dishController = require("./controllers/dishController")

// import jwtMiddleWare - valid and created token
const jwtMiddleware = require('./middleware/jwtMiddleware')
// import multer - upload file controling
const multerConfig = require('./middleware/multerMiddleware')

// register route
router.post('/user/register',multerConfig.single('profileImg'),userController.userRegister)

// login route
router.post('/user/login',userController.loginRegister)

// profile edit route
router.put('/profile-edit',jwtMiddleware,multerConfig.single('profileImg'),userController.userProfileUpdate)

// addDish route
router.post('/add-dish',jwtMiddleware,multerConfig.single('image'),dishController.addDish)

// get userDish route
router.get('/user/all_Dishes',jwtMiddleware,dishController.userDish)

// user Dish Update
router.put('/user/update_dish/:id',jwtMiddleware,multerConfig.single('image'),dishController.userDishUpdate)

// get all dishs
router.get('/all_dishes',dishController.getAllDish)
module.exports = router