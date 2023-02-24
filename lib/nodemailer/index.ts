import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const email = process.env.GOOGLE_EMAIL;
const password = process.env.GOOGLE_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: email,
    pass: password,
  },
});

export default function sendMail(
  mailOptions: MailOptions
): Promise<SMTPTransport.SentMessageInfo> {
  return transporter.sendMail({
    from: email,
    ...mailOptions,
  });
}
