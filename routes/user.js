const { Router } = require('express');
const userMiddleware = require('../middleware/user.js');
const { User } = require('../db');
const { Course } = require('../db');
const router = Router();
const courseMiddleware = require('../middleware/course.js');
//admin routes

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    const user = await User.findOne({
        username: username,
        password: password
    })

    if (user) {
        return res.status(403).send({
            msg: "User already in system"
        })
    } else {
        await User.create({
            username: username,
            password: password
        });

        res.json({
            msg: "User created successfully"

        })
    }

})

router.get('/courses', userMiddleware, async (req, res) => {
    const all = await Course.find({});
    res.json({
        Courses: all
    });
})

router.post('/courses/:courseID', userMiddleware, courseMiddleware, async (req, res) => {
    const courseID = req.params.courseID;
    const user = await User.findById(req.userId);
    await User.updateOne({
        username: user.username
    }, {
        "$push": {
            purchasedCourses: courseID
        }
    });
    res.json({
        message: "Purchase completed"
    })

})

router.get('/purchasedcourses', userMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);
    const purchaseArray = [];
    for (let i=0;i<user.purchasedCourses.length;i++){
        let courseTitle = await Course.findById(user.purchasedCourses[i]);
        purchaseArray.push([user.purchasedCourses[i] , courseTitle.title])
    }
    res.json({
        purchasedCourses: purchaseArray
    });
})

module.exports = router;