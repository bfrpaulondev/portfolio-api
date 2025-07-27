/**
 * @file utils/mailer.js
 * @description Configuração para envio de e-mails via Gmail usando Nodemailer.
 */

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // smtp.gmail.com
  port: Number(process.env.EMAIL_PORT), // 465
  secure: process.env.EMAIL_SECURE === "true", // true
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = transport;
