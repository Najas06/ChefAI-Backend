// import jwt module
const jwt = require('jsonwebtoken')

const jwtMiddleWare = (req,res,next)=>{
    console.log('inside jwt middleware'); // show passing route
    const token = req.headers.authorization.split(" ")[1] // spliting with " " and get token

    try {
        const jwtResponse = jwt.verify(token,"supersecretkey")
        console.log(jwtResponse); // verify after real token show
        req.payload = jwtResponse.userId
        next()
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

module.exports = jwtMiddleWare