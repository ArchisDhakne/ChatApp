import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import messageRoute from './routes/message.route.js'
import { app, server } from './SocketIO/server.js';
import path from 'path'
//------------database connectivity------------
dotenv.config()
const PORT = process.env.PORT || 4002
const URI = process.env.MONGODB_URI

//--------------------------------------------
//const app = express(); took this to socket file
app.use(express.json());
app.use(cors());  
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
 
app.use('/api/user',userRoute);
app.use('/api/message',messageRoute)

//--------------Deplyment code-----

if(process.env.NODE_ENV === "production"){
  
  const dirPath = path.resolve()

app.use(express.static("./Frontend/dist"))
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(dirPath,"./Frontend/dist",'index.html'));
})

}










try {
   mongoose.connect(URI
    , {useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,} )
   console.log("connected to db");
   
} catch (error) {
    console.log(error);
}  


server.listen(PORT,()=>{
  console.log(`listening on ${PORT}`);
})