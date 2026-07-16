const express=require('express');
const app= express();

app.get("/:id",(req,res)=>{
    res.send(`product  id is ${req.params.id}`);
})

app.listen(3000,(req,res)=>{
    console.log("server is runnning on port 3000");
})