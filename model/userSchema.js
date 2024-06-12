// model for user collection
const mongoose = require('mongoose')

//schema // model
const userSchema = mongoose.Schema({
    fullname:{
        require:true,
        type:String
    },
    username:{
        require:true,
        type:String
    },
    email:{
        require:true,
        type:String
    },
    profileImg:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    }
})

const users = mongoose.model('users',userSchema)

module.exports = users