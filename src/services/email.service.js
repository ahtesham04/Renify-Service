const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services like Yahoo, Outlook, etc.
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendEmail;
