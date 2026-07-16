///search?name=Rahul&city=Delhi
//Rahul lives in Delhi

const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    console.log(req.query);
    res.send(`${req.query.name} lives in ${req.query.city}`)
})

app.listen(3000,()=>{
    console.log("server is running on port");
})