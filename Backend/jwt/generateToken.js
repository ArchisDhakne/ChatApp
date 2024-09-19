import jwt from 'jsonwebtoken'



const tokenAndcookie = (UserId,res) => {
  const token = jwt.sign({UserId},process.env.JWT_TOKEN,{
    expiresIn:"10d"
  });

  res.cookie("token",token,{
    httpOnly:true, //xss
    secure:true,
    sameSite:"strict" //csrf
  });
}

export default tokenAndcookie;