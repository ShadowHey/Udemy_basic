const { Router } = require('express');
const adminMiddleware = require('../middleware/admin.js');
const { Admin } = require('../db');
const { Course } = require('../db');
const router = Router();

//admin routes
let courseCodeNum = 0;
router.post('/signup' , async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({
        username:username,
        password:password
    })
        
    if(user){
        return res.status(403).send({
            msg:"Admin already in system"
        })
    }else {
    await Admin.create({
        username:username,
        password:password
    });
    
    res.json({
        msg:"Admin created successfully"

    })}
})

router.post('/courses', adminMiddleware ,async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imgLink = req.body.imgLink;
    const price = req.body.price;
    const courseCode = courseCodeNum++;

    
    
    const newCourse = await Course.create({
        title:title,
        description:description,
        imgLink: imgLink,
        price:price,
        courseCode: courseCode

    })

    res.json({
        msg:"Course created successfully",
        CourseID: newCourse._id
    })


})

router.get('/courses' ,adminMiddleware, async (req,res)=>{
    const all = await Course.find({});
    res.json({
        Courses: all
    });
})

module.exports = router;