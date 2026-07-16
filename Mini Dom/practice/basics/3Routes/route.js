const express=require("express");

const app=express();

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.get("/about",(req,res)=>{
    res.send("about page");
})

app.get("/contact",(req,res)=>{
    res.send("contact page");
})

app.listen(3000,()=>{
    console.log("server running on port 3000")
})