const { Admin } = require('../db');
async function adminMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;

    const admin = await Admin.findOne({
        username:username,
        password:password
    })
    
    if(!admin){
        return res.status(403).send({
            msg:"Invalid Admin Credentials"
        })
    }
    req.adminId = admin._id;
    next();

}

//check if admin exist in the dataase
module.exports = adminMiddleware;