const crypto = require('crypto');
const mailService = require('./mail-service');
class OtpService {
  generateOtp() {
    return crypto.randomInt(1000, 9999);
  }

  sendOtp(email, otp) {
    const message = `<p>Below is the OTP</p>`;

    return mailService.sendEmail(
      email,
      'OTP Verification',
      '',
      `<h3>Hello,${email}</h3>
        ${message}
        <p>${otp}</p>
        <p>The OTP will be valid only for 5 minutes</p>
      `
    );
  }
}

module.exports = new OtpService();
