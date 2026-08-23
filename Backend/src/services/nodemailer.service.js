import nodemailer from "nodemailer";
import transporter from "../configs/nodemailer.config.js";

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Admin" <${process.env.GOOGLE_USER}>`, // sender address
      to, // list of recipients
      subject, // subject line
      text, // plain text body
      html, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};

export { sendEmail };
