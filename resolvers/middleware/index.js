const { skip } = require('graphql-resolvers');
module.exports.isAuthenticated = (_,__,{email})=>{
    if(!email){
        throw new Error('Access Denied!')
    }
    return skip; //Similar to next()
}