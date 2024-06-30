// import schema form model
const users = require('../model/userSchema')

// import jwtMiddleWare 
const jwt = require('jsonwebtoken')

// register logic control
exports.userRegister = async (req, res) => {
    console.log('inside register controller');
    const profileImg = req.file.filename
    console.log(profileImg);
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

exports.userProfileUpdate = async(req,res)=>{
    const userId = req.payload
    const {fullname,username,email,password,profileImg} = req.body
    console.log(req.filename);

    const profilePhoto = req.file?req.file.filename:profileImg
    try {
        const existingUser = await users.findByIdAndUpdate({_id:userId},{fullname,username,email,password,profileImg:profilePhoto},{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}