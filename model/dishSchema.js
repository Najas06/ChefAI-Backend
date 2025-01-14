// model fpr dish collection
const mongoose = require('mongoose')

// schema // model
const dishSchema = mongoose.Schema({
    dishname:{
        require:true,
        type:String
    },
    ingredients:{
        require:true,
        type:String
    },
    description:{
        require:true,
        type:String
    },
    image:{
        require:true,
        type:String
    },
    userId:{
        require:true,
        type:String
    },
    feedback:[{
        username:String,
        feedback:String,
        userImg:String,
        timestamp:{
            type:Date,
            default:Date.now}
    }]
})

const dishes = mongoose.model('dishes',dishSchema)

module.exports = dishes