const { Course } = require('../db');
async function courseMiddleware(req,res,next){
    const id = req.params.courseID;
    const course = await Course.findById(id);
    if(!course){
        return res.status(407).send({
            msg:"This course does'nt exist"
        })
    }
    req.courseId = course._id;
    next();
}

//check if admin exist in the dataase
module.exports = courseMiddleware;