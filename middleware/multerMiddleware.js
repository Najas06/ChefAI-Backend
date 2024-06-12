// import multer
const multer = require('multer')
// create storage space in server
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads') // where the file will be stored
    },
    filename:(req,file,callback)=>{
        //Date.now() - return millisecond from the date class
        const filename = `img-${Date.now()}-${file.originalname}`
        callback(null,filename) // send the name storing path
    }
})

// checking user sending file is img , image,png
const fileFilter = (req,file,callback)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('Only image , jpeg , png format allowed'))
    }
}

// calling multer
const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig