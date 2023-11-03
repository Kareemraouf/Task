const express = require('express');
const mongoose = require('mongoose');

let app = express();

const dbURI = 'mongodb+srv://kareemraouf36:Kareem2002@cluster0.g00xnje.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000 })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const studentSchema = new mongoose.Schema({
    phoneNumber : String,
    password : String,
    age : Number,
    address : String ,

});

const coursesSchema = new mongoose.Schema({
    name : String,
    description : String,
});

let Students = mongoose.model("students", studentSchema);
let Courses = mongoose.model("courses",coursesSchema);

let user = new Students({
    phoneNumber : "+201091513901",
    password : "1311",
    age : 21,
    address : "portsaid" ,
}).save();

let course = new Courses({
    name : "Javascript",
    description : "Programming language",
}).save();

app.get('/students', async (req, res) => {
    try {
      const students = await Students.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch students' });
    }
  });
  
  app.get('/courses', async (req, res) => {
    try {
      const courses = await Courses.find();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch courses' });
    }
  });

app.listen(8080, function(){
    console.log('Server is now open')
})

