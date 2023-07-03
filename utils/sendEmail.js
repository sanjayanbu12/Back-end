// const nodemailer=require('nodemailer')

// const sendEmail = (options)=>{
//     const transporter = nodemailer.createTransport({
//         service:process.env.EMAIL_SERVICE,
//         auth:{
//             user:process.env.EMAIL_USERNAME,
//             pass:process.env.EMAIL_PASSWORD
//         }
//     })

//     const mailOptions = {
//         from: process.env.EMAIL_FROM,
//         to: options.to,
//         subject: options.subject,
//         html: options.html,
//       };
      

//     transporter.sendMail(mailOptions,function (err,info) {
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(info);
//         } 
//     })
// }

// module.exports=sendEmail;

const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

const sendEmail = (options) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;