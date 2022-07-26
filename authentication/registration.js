const utils = require('../utils');

const UserService = require('../services/user-service');

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
            let created = await userService.createNewUser(
                FirstName, LastName, Email, hashedPassword, roles
            );

            if(created) {
                let response = {
                    Message: `Use created successfully`,
                    Success: true
                };
                res.status(201).json(response);
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