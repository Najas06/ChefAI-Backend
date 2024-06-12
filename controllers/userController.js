// import schema form model
const users = require('../model/userSchema')

// import axios for generate recipe
const axios = require('axios')

// import jwtMiddleWare 
const jwt = require('jsonwebtoken')

// register logic control
exports.userRegister = async (req, res) => {
    console.log('inside register controller');
    const profileImg = req.file.filename
    const { fullname, username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(401).json('User already exist')
            // console.log('User already exist');
        }
        else {
            const user = new users({
                fullname,
                username,
                email,
                profileImg,
                password
            })
            await user.save()
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

// login logic control
exports.loginRegister = async (req, res) => {
    console.log('inside login controll');
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'supersecretkey', { expiresIn: '1h' })
            res.status(200).json({ existingUser, token })
            console.log(existingUser, token);
        }
        else {
            res.status(401).json('Invalid credentials')
        }
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

//genearte recipe logic control
exports.generateDish = async (req, res) => {
  const { dish } = req.body;
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';

  try {
    const response = await axios.get(`${API_URL}${dish}`);
    const data = response.data.meals;

    if (data && data.length > 0) {
      res.status(200).json(data[0]);
    } else {
      res.status(404).send('Dish not found');
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).send('Error fetching recipe');
  }
};