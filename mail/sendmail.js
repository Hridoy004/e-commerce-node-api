const nodemailer = require('nodemailer');

class MailSender {

    constructor(mail_address = null, mail_password = null) {
        this.mail_address = process.env.MAIL_ADDRESS || mail_address;
        this.mail_password = process.env.MAIL_PASSWORD || mail_password;
    }

    async sendMail(to, subject, body) {

        if (!this.mail_password || !this.mail_address) {
            console.log("Sender email or password is missing from environment");
            return false;
        }

        const mailOptions = {
            from: this.mail_address,
            to: to,
            subject: subject,
            replyTo: this.mail_address,
            html: body
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            // yPZu6AKULzNs
            port: 587,
            secure: false,
            auth: {
                user: this.mail_address,
                pass: this.mail_password
            }
        })

        return await transporter.sendMail(mailOptions);
    }

}

module.exports = MailSender;