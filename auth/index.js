const express=require('express');
const app=express();
const Users=require('./models/user')
const mongoose =require('mongoose');

mongoose.connect("mongodb://localhost:27017/vgu")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.use(express.urlencoded({extended:true}))
app.set("view engine",'ejs');

app.get("/",(req,res)=>{
    res.render('home');
})
app.get("/signup",(req,res)=>{
    res.render('signup');
})
app.get("/login",(req,res)=>{
    res.render('login')
})
app.post("/signup",async(req,res)=>{
    const {username,password,email}=req.body;
    await Users.create({username,password,email});
    res.redirect('home');
})
app.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const result=await Users.findOne({username,password});
    if(result){
        res.redirect("home");
    }
    else{
        res.send("password is mismatched")
    }
})



app.listen(3000,()=>{
    console.log("server is running on port 3000")
})