const { User } = require('../db');
require('dotenv').config();
async function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    try {
        const user = await User.findOne({
            token:token
        });
        req.user = user;
        next();
    } catch (err) {
        res.json({
            msg: "Invalid token!"
        })
    }

}

//check if user exist in the dataase
module.exports = userMiddleware;