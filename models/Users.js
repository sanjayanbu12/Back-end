const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        types: [String],
        default: ['admin'],
    },
    active: {
        type: Boolean,
        default: true
    }
},{timestamps:true})
module.exports=mongoose.model('Users',userSchema)//in modal we define