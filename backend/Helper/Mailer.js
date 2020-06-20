var nodemailer = require("nodemailer");

module.exports = function sendMail(mailData) {
  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "maheshtrapasiya123@gmail.com",
      pass: "maddy7498",
    },
  });

  var mailOptions = {
    from: mailData.from,
    to: mailData.to,
    subject: mailData.subject,
    text: mailData.text,
    html: mailData.html,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};
