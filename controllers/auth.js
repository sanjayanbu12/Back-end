const register=(req,res,next)=>{
    res.send('register Routes')
}

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