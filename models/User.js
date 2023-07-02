const mongoose = require('mongoose')
const bcrypt=require('bcrypt')

const userSchema = new mongoose.Schema({
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

userSchema.pre('save',async function(next){
    if(!this.idModefied('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt)
    next();
})

module.exports=mongoose.model('User',userSchema)//in modal we define