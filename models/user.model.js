import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
  },
  confirmPassword:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  
},{timestamps:true}) // createdAt && UpdatedAt


const User = mongoose.model("User",userSchema);

export default User