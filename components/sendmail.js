require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "meylinmad1234@gmail.com",
    pass: process.env.password,
  },
  secure: true,
});

function mailOptions(email_address, subject, message) {
  return {
    from: process.env.EMAIL_HOST_ADDRESS,
    to: email_address,
    subject: subject,
    text: message,
  };
}

export const sendRequiryEMail = async (mail_data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user_mail_option = mailOptions(
        mail_data.email,
        mail_data.title,
        mail_data.message
      );

      transporter.sendMail(user_mail_option, (error, info) => {
        if (error) {
          console.log(error);
          resolve(error);
        } else {
          resolve(info);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  sendRequiryEMail,
};
