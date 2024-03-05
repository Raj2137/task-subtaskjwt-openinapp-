const jwt= require('jsonwebtoken');
const user = require('../model/Auth');

//verifying token middleware

module.exports= (req, res, next)=>{
    try{
        const toko= req.headers.authorization.split(" ")[1];
        console.log(toko);
        const decode= jwt.verify(toko, process.env.jwt_key);
        console.log(decode);
        req.userdata= decode;
        next();
    } catch(error){
        console.log(error);
        res.status(401).json({
            message: "Auth failed"
        })
    }
    
}