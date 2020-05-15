const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

module.exports.verifyUser = async(req)=>{
    // console.log('REQ',req.headers);
    try{
        req.email = null;
        const bearerHeader = req.headers.authorization;
        if(!!bearerHeader){
            const token = bearerHeader.split(' ')[1];
            // console.log('TOKEN', token);
            const payload = jwt.verify(token,SECRET_KEY );
            req.email = payload.email;
        }
    } catch(err){
        console.log(err);
        throw err;
    }
    
}   