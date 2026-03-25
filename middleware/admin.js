const { Admin } = require('../db');
require('dotenv').config();
async function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    try {
        const admin = await Admin.findOne({
            token:token
        })
        req.admin = admin;
        next();
    } catch (err) {
        res.json({
            msg: "Invalid token!"
        })
    }

}

//check if admin exist in the dataase
module.exports = adminMiddleware;