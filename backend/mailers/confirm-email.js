const nodemailer = require('nodemailer');
require('dotenv').config()

async function sendEmail(receiver_email, link){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: true
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: receiver_email,
        subject: 'Confirmation email',
        text: `Thank you for registering on our website, please confirm your email via the link ${link} `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log(error);
    } 
}

module.exports = {
    sendEmail
}
