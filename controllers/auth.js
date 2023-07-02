const User=require('../models/User')

const register = async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
      const user = await User.create({
        username,
        password,
        email,
      });
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
  

const login=(req,res,next)=>{
    res.send('login Routes')
}

const forgotpassword=(req,res,next)=>{
    res.send('forgot password Routes')
}

const resetpassword=(req,res,next)=>{
    res.send('reset password Routes')
}

module.exports={
    register,
    login,
    forgotpassword,
    resetpassword
}