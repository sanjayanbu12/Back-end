const User = require('../models/User')
const ErrorResponse=require('../utils/errorResponse')

const register = async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        const user = await User.create({
            username,
            password,
            email,
        });
    sendToken(user,201,res)

    } catch (error) {
     next(error)
    }
};


const login = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorResponse("please provide email and password", 400))
    }
    try {

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401))
        }

        const isMatch=await user.matchPasswords(password);

        if(!isMatch){

        return next(new ErrorResponse("Invalid credentials", 401))

        }
    sendToken(user,200,res)

    }
    catch (error) {
        res.status(500).json({success:false, error:error.message})
    }
}

const forgotpassword = (req, res, next) => {
    res.send('forgot password Routes')
}

const resetpassword = (req, res, next) => {
    res.send('reset password Routes')
}

const sendToken = (user,statusCode,res)=>{
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token
    })
}

module.exports = {
    register,
    login,
    forgotpassword,
    resetpassword
}