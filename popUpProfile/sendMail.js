
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ajayrmavs272191@gmail.com',
    pass: 'beOne111'
  }
});
var mailOptions = {
  from: 'ajayrmavs272191@gmail.com',
  to: 'ajayrmavs33236@gmail.com',//we can add as many mail addresses as  from std. website.
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 