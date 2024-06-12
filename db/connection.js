const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Connected Succesfully");
}).catch((err)=>{
    console.log(err);
})