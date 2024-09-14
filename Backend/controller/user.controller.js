import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import tokenAndcookie from '../jwt/generateToken.js';
export const signup = async (req, res) => {
  console.log(req.body);  // Log the incoming data for debugging

  const { fullname, email, password, confirmPassword } = req.body;

  if (!fullname) {
    return res.status(400).json({ error: 'Full name is required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");  // Log this if the user already exists
      return res.status(400).json({ error: "User already has an account. Please sign in!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // edited here put one await extra 
    const newUser = await new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      console.log("New user created:", newUser);  // Log the newly created user
      tokenAndcookie(newUser._id, res);
      return res.status(201).json({ message: "User created successfully", userwithThisLogin:{
        _id:newUser._id,
        fullname:newUser.fullname,
        email:newUser.email
       } });
    }

  } catch (error) {
    console.error("Error during signup:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};



//---------------------------------------------
export const login = async(req,res) =>{
  const {email,password} = req.body;

  try {
    
    const userwithThisLogin =await User.findOne({email})
   
    const isMatch = await bcrypt.compare(password,userwithThisLogin.password)
   
    if(!userwithThisLogin || !isMatch){
            
      return res.status(400).json({error:"invalid user credintials"})
    }
     tokenAndcookie(userwithThisLogin._id,res);
     res.status(200).json({message:"user logged in succesfully",userwithThisLogin:{
      _id:userwithThisLogin._id,
      fullname:userwithThisLogin.fullname,
      email:userwithThisLogin.email
     }})



  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
    
  }
};


export const logout =async (req,res)=>{
   try {
       res.clearCookie("token");
       res.status(201).json({message:"User logged out succesfully!!"});
   } catch (error) {
       console.log(error);
       res.status(500).json({error:"Internal server error"});
   }
}

//--------------------------------------------

export const allUsers = async (req,res)=>{
  try {
    const loggedInUser = req.user._id;
    
    const filteredUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password");    
    res.status(201).json(filteredUsers)
  
  } catch (error) {
    console.log("Error in all Users:",error);
    return res.status(500).json({error:"Internal server error in user.control.js"})
  }
}