require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECT_KEY);

//define schemes
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
     
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    courseCode: String,
    imgLink: String,
    price: Number

});

const Admin = mongoose.model('Admin' , AdminSchema);
const User = mongoose.model('User' , UserSchema);
const Course = mongoose.model('Course' , CourseSchema);


module.exports = {
    Admin,
    User,
    Course
}