const mailConfig = require('../util/mailConfig');
const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport(mailConfig);
  }

  sendEmail(to, subject, text, html) {
    return this.transporter.sendMail({
      from: '"Learn Code With Hasan" <hans1998ali@gmail.com>',
      to,
      subject,
      text,
      html,
    });
  }
}

module.exports = new MailService();
