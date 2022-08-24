const utils = require('../utils');

const UserService = require('../services/user-service');
const verification = require('../verification');
const VerificationService = verification.Services.VerificationService;
const mail = require('../mail');

const registration = async (req, res, next) => {

    const { FirstName, LastName, Email, Password } = req.body;

    if(FirstName && LastName && Email && Password) {
        let hashedPassword = await utils.encryption.hashPassword(Password);

        const userService = new UserService();
        let exists = await userService.isUserAlreadyExists(Email);
        if(exists)  {
            let response = {
                Message: `User already exists with the email address${Email}`,
                Success: false
            }
            res.status(400).json(response);
        } else {
            const roles = ['user'];
            const createdUserId = await userService.createNewUser(
                FirstName, LastName, Email, hashedPassword, roles
            )
            if(createdUserId) {
                let response = {
                    Message: 'use created successful',
                    Success: true
                }

                const verificationService = new VerificationService();
                const token = await verificationService.generateVerificationToken(createdUserId);

                try {
                    const mail_sender = new mail.MailSender();
                    const subject = "Registration Successful";
                    const body = `<p>Hi ${FirstName} ${LastName}</p>
                                  <br>Welcome abord! Your user creation our e-commerce application is successful<br>
                                  <a href="http://localhost:3000/verify?token=${token}">Verify Email</a>
                                  <br>Cheers<br>`
                    await mail_sender.sendMail(Email, subject, body);
                    res.status(200).json(response);
                } catch (e) {
                    response.Message ='user creation failed  mail server issue';
                    response.Success = false
                    await userService.deleteUserById(Email);
                    res.status(200).json(response);
                }


            } else {
                let response = {
                    Message: 'use creation failed',
                    Success: false
                }
                res.status(400).json(response);
            }
        }
    } else {
        let response = {
            Message: 'Missing required field',
            Success: false
        }
        res.status(400).json(response);
    }
}

module.exports = registration;