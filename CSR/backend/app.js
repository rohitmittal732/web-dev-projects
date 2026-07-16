const express=require('express');
const app=express();
const cors=require('cors');

app.use(cors());
app.use(express.json())


let todos=["cricket","music","book reading"];
app.get("/",(req,res)=>{
    res.json({todos})
})

app.post("/",(req,res)=>{
    console.log(req.body);
    const {task}=req.body;
    todos.push(task);
    res.json({todos});
})

app.listen(4000,()=>{
    console.log("server is running on port 4000")
})