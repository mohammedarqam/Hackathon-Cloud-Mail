
import * as functions from 'firebase-functions';
const nodemailer = require('nodemailer');

const APP_NAME = 'Arqam.Tech Hackathon';

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

export const onUserCreate = functions.database
.ref("Users/{userId}").onCreate((snapshot,context)=>{

    const user = snapshot.val();
    const email = user.Email;
    const name = user.Name;

    return sendWelcomeEmail(email, name);

})



function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: email,
      subject : `Welcome to ${APP_NAME}!`,
      text : `Hey ${displayName || ''}! Welcome to ${APP_NAME}. See you on Sunday`
    };
  
    return mailTransport.sendMail(mailOptions);
  }