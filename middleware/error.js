const ErrorResponse=require('../utils/errorResponse')

const errorhandeler=(err,req,res,next)=>{
    let error={...err}
    error.message=err.message
    if()
}