function emailing(email, code) {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        host: 'ssl0.ovh.net',
        name: 'qenvi.com', 
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@qenvi.com',
            pass: 'noQEN-2022!!'
        }
    });
    var mailOptions = {
        from: 'noreply@qenvi.com', //It will work if i give me@myserver.com but i need no-reply@myserver.com in from option.        
        to: 'yacinemathurin@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'Have your reset code: '+ code
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    }); 
}

module.exports = emailing;
