const express=require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/vgu')
.then(()=>{
    console.log("db is connected");
})
.catch((err)=>{
    console.log(err);
})
const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    age:Number,
    city:String
})
const Users=mongoose.model("Users",userSchema)

// Users.insertMany(
//     [
//   { username: "rohit123", password: "pass123", age: 21, city: "Jaipur" },
//   { username: "priya22", password: "secure456", age: 22, city: "Delhi" },
//   { username: "amit20", password: "amit@789", age: 20, city: "Mumbai" },
//   { username: "sneha23", password: "sneha#321", age: 23, city: "Pune" },
//   { username: "vikram24", password: "vikram!999", age: 24, city: "Chennai" }
// ]

// ).then(()=>{console.log("document is created")})

Users.updateMany({},{password:"pass%123"})

Users.find()
.then((data)=>{
    console.log(data)
})
app.listen(4000,()=>{
    console.log("server is running on port 4000");
})