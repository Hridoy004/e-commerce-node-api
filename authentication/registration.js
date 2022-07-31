const utils = require('../utils');

const UserService = require('../services/user-service');
const verification = require('../verification');
const VerificationService = verification.Services.VerificationService;
const mail = require('../mail');

const registration = async (req, res, next) => {

    const { FirstName, LastName, Email, Password } = req.body;

    if(FirstName && LastName && Email && Password) {
        let hashedPassword = await utils.encryption.hashPassword(Password);

        let userService = new UserService();
        let exists = await userService.isUserAlreadyExists(Email);
        if(exists) {
            let response = {
                Message: `User already exists with the email address ${Email}`,
                Success: false
            }
             res.status(400).json(response);
        } else {

            // we should refactor later
            // move them into env or constants

            const roles = ['user'];
            let createdUserId = await userService.createNewUser(
                FirstName, LastName, Email, hashedPassword, roles
            );

            if(createdUserId) {
                let response = {
                    Message: `Use created successfully`,
                    Success: true
                };

                const verificationService = new VerificationService();
                const token = await verificationService.generateVerificationToken(createdUserId);

                console.log(token);

                try {
                    const mail_sender = new mail.MailSender();
                    const subject = "Registration successful";
                    const body = `<p>Hi ${FirstName} ${LastName},</p>
                                  <br> Welcome aboard! Your registration with our e-commerce application is successful<br>
                                  <a href="http://localhost:3000/verify?token=${token}">Verify Email</a><br>
                                  <br>Cheers<br>`
                    await mail_sender.sendMail(Email, subject, body);
                    res.status(201).json(response);

                } catch(e) {
                    response.Success = false;
                    response.Message = 'User creation failed because mail server issue';
                    await userService.deleteUserById(createdUserId)
                    res.status(400).json(response);
                }

            } else {
                let response = {
                    Message: `Use creation failed`,
                    Success: false
                };
                res.status(400).json(response);
            }
        }

    } else {
        let response =  {
            Message: "Missing required fields",
            Success: false
        }
        res.status(400).json(response);
    }
};

module.exports = registration;