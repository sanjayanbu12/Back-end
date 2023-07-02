class ErrorResponse extends Error{
    constructor(message,statusCode){
    super(message)
    this.statusCode=statusCode;
    }
}

// const ErrorResponse = require('ErrorResponse');

// // Example usage:
// const error = new ErrorResponse('An error occurred', 500);
// console.log(error.message); // Output: An error occurred
// console.log(error.statusCode); // Output: 500


module.exports=ErrorResponse