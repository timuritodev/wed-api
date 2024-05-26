require("dotenv").config();
const nodemailer = require("nodemailer");

const sendAgreement = async ({ email, text }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.MAIL,
    subject: "Подтверждение",
    text: text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendAgreement,
};
