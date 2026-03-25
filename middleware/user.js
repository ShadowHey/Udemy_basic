const { User } = require('../db');
async function userMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;
    
    const user = await User.findOne({
        username:username,
        password:password
    })
        
    if(!user){
        return res.status(403).send({
            msg:"Invalid Admin Credentials"
        })
    }
    req.userId = user._id;
    next();
}

//check if admin exist in the dataase
module.exports = userMiddleware;