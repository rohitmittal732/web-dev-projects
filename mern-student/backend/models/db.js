const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/vgu");

const stdSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    
    marks:{
        type:Number,
        
        required:true,
    },

})
const Student=mongoose.model("Student",stdSchema);

module.exports=Student;
