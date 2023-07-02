const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[ true,"provide username"]
    },
    password: {
        type: String,
        required:[true,"provide password"],
        minlength:6,
        select:false
    },
    email:{
        type:String,
        required:[true,"please provide email"],
        unique:true,
        match:[ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"please provide a valid email"]
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.getSignedToken = function(){
    return jwt.sign(
        {id: this._id}, 
        process.env.JWT_SECRET, 
        {expiresIn:process.env.JWT_EXPIRE}
        )
}

  
const User=mongoose.model('User',UserSchema)//in modal we define

module.exports=User