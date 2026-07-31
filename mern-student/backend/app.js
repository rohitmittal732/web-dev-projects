const express=require('express');
const mongoose=require('mongoose');
const Student=require('./models/db');
const cors=require('cors');
const app=express();

mongoose.connect("mongodb://localhost:27017/vgu")
.then(()=>{console.log("db is connected")})
.catch((err)=>{console.log(err)});

app.use(cors());
app.use(express.json())

app.get("/hello",(req,res)=>{
    res.send("hello")
})
// Student.insertMany([
//   { name: "Rohit Sharma", email: "rohit@example.com", marks: 85 },
//   { name: "Priya Mehta", email: "priya@example.com", marks: 92 },
//   { name: "Amit Verma", email: "amit@example.com", marks: 76 }
// ]
// )
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find(); 
    return res.json(students); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/students",async(req,res)=>{
    try{
        const student=req.body;
    await Student.create(
        student
    );
    return res.status(201).json({
        message: "Student Added"
    });
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
})
app.put("edit/:id",async(req,res)=>{
    try{
        const id= req.params.id;
        const {name,email,marks}=req.body;
        await Student.findByIdAndUpdate(id,{name,email,marks})
    }
    catch(err){
        console.log(err.message);
    }

})
// app.put("/update",(req,res)=>{
//     Student.findByIdAndUpdate()
// })
// app.delete("/delete",(req,res)=>{
//     Student.findByIdAndDelete()
// })
app.listen(5000,()=>{
    console.log("server is running on port 5000");
})