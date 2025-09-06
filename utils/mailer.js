const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async ({ to, subject, text, html, cc, attachments = [] }) => {
  try {
    // const transporter = nodemailer.createTransport({
    //   service: "gmail", // or SMTP
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    //   port: 465,
    //   secure: true,
    // });

    let transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
     user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // <-- bypass certificate error
  }
});

    const mailOptions = {
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,         // Optional: You can use either `text` or `html`
      cc,           // Optional
      attachments,  // Optional
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to", to);
    return true;
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    throw err;
  }
};

module.exports = { sendMail };
