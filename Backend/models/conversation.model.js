import mongoose from "mongoose";
import User from './user.model.js'
import Message from './message.model.js'
const conversationSchema = mongoose.Schema({
   members:[
   { 
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
   ],             
   messages:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Message',
      
    }
   ]
},{timestamps:true})


export default mongoose.model('conversation',conversationSchema)