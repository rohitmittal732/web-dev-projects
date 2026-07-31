const mongoose =require('mongoose');


const userSchema=new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
        trim:true
    },
    
    
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    }
})
const Users=mongoose.model("Users",userSchema);

module.exports=Users;