const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    age:Number,
    city:String
})

const User=mongoose.model("User",userSchema);
module.exports=User;