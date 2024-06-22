// import schema form model
const dishes = require('../model/dishSchema')

exports.addDish = async (req, res) => {
    console.log("inside addDish");

    const userId = req.payload // from jwt middleware
    const image = req.file.filename // from multer middleware

    const { dishname, ingredients, description } = req.body
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

exports.userDish = async (req, res) => {
    const userId = req.payload
    try {
        const userDish = await dishes.find({ userId })
        // console.log(userDish);
        res.status(200).json(userDish)
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

exports.userDishUpdate = async (req, res) => {
    const { id } = req.params
    // console.log(id);
    const { dishname, ingredients, description, image } = req.body
    const uploadImage = req.file ? req.file.filename : image
    console.log(uploadImage);
    try {
        const existingDish = await dishes.findByIdAndUpdate({ _id: id }, { dishname, ingredients, description, image: uploadImage }, { new: true })
        await existingDish.save()
        res.status(200).json(existingDish)
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

exports.getAllDish = async (req, res) => {
    const searchKey = req.query.search 
    console.log(searchKey);
    try {
        const query = {
            dishname : {
                $regex : searchKey,
                $options : 'i' // case insensitive
            }
        }
        const allDish = await dishes.find(query)
        // console.log(allDish);
        res.status(200).json(allDish)
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

exports.userDishDelete = async (req,res) =>{
    console.log("inside userDishDelete");
    const { id } = req.params
    try {
        const deletedDish = await dishes.findByIdAndDelete({_id:id})
        res.status(200).json(deletedDish)
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}