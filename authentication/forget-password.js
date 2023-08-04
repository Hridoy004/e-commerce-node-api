const UserService = require('./../services/user-service');
const TokenService = require('../services/token-service');
const mail = require("../mail");

const forgetPassword = async (req, res) => {
    const { Email } = req.body;
    if (!Email) {
        let response = {
            Message: 'Email is missing',
            Success: false
        }
        res.status(400).json(response);
    }

    let userService = new UserService();
    const user = await userService.getUserByEmail(Email);
    if (!user) {
        let response = {
            Message: 'User not found',
            Success: false
        }
        res.status(400).json(response);
    } else {
        const tokenService = new TokenService();
        let token = tokenService.getForgetPasswordToken(user);

        let response = {
            Message: 'Please go to your email for reseting the password',
            Success: true,
            Token: token,
        }

        try {
            const mail_sender = new mail.MailSender();
            const subject = "Reset password Email";
            const body = `<p>Hi ${user.FirstName} ${user.LastName}</p>
                                  <br>Please click here to 
                                  <a href="http://localhost:4200/auth/reset-password?token=${token}">Reset your password</a><br>`
            await mail_sender.sendMail(Email, subject, body);
            res.status(200).json(response);
        } catch (e) {
            response.Message = 'Reset password failed  mail server issue';
            response.Success = false
            await userService.deleteUserById(Email);
            res.status(200).json(response);
        }
    }
}

module.exports = forgetPassword;