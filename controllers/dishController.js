// import schema form model
const dishes = require('../model/dishSchema')

exports.addDish = async(req,res)=>{
    console.log("inside addDish");
    
    const userId = req.payload // from jwt middleware
    const image = req.file.filename // from multer middleware

    const {dishname,ingredients,description} = req.body 
    try {
        const newDish = new dishes({
            dishname,
            ingredients,
            description,
            image,
            userId
        })
        await newDish.save()
        res.status(200).json(newDish)
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }

}

exports.userDish = async(req,res)=>{
    const userId = req.payload
    try {
        const userDish = await dishes.find({userId})
        console.log(userDish);
        res.status(200).json(userDish)
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

