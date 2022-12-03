import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "meylinmad1234@gmail.com",
    pass: process.env.password,
  },
  secure: true,
});

function mailOptions(email_address: string, subject: string, message: string) {
  return {
    from: process.env.EMAIL_HOST_ADDRESS,
    to: email_address,
    subject: subject,
    text: message,
  };
}

function sendRequiryEMail(mail_data: any) {
  let user_mail_option = mailOptions(
    mail_data.email,
    mail_data.title,
    mail_data.message
  );

  transporter.sendMail(user_mail_option);
}

export { sendRequiryEMail };
