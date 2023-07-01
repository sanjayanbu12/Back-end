const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
        projectId:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        powner:{
            type:String,
            required:true
        },
        lead:{
            type:String,
            required:true
        },
        scrum:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        memb:{
            type:[{String}],
            required:true,
                },
        description:{
            type:String
        }

},{timestamps:true})

module.exports=mongoose.model('Projects',projectSchema)