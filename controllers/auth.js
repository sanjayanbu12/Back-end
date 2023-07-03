const User = require('../models/User')
const ErrorResponse=require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

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

const forgotpassword = async (req, res, next) => {
    const {email}=req.body

    try{
        const user=await User.findOne({email})
        
        if(!user){
            return next(new ErrorResponse("Email could not be sent",404))
        }
        const resetToken=user.getResetPasswordToken()

        await user.save();

        const resetUrl=`localhost:5000/passwordreset/${resetToken}`

        const message = `
        <h1>You have requested a password reset<h1/>
        <p>Please go to these link to reset these password<p/>
        <a href=${resetUrl} clicktracking=off>${resetUrl}<a/>`

        try {

            await sendEmail({
                to:user.email,
                subject:"Reset Password Request",
                text:message
            });
        res.status(200).json({success:true,data:"Email sent"})

        } catch (error) {
            
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be send", 500))

        }
    }
    catch(error){
        next(error);
    }
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