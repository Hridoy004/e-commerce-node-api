const UserService = require('./../services/user-service');
const TokenService = require('../services/token-service');
const utils = require('../utils');

const login = async (req, res, next) => {

    const { Email, Password } = req.body;

    if(!Email || !Password) {
        res.status(400).json({
            Message: "Email and Password is required",
            Status: 400,
            Success: false
        })
    } else {

        const userService = new UserService();
        const user = await userService.getUserByEmail(Email);

        if(!user) {
            res.status(400).json({
                Message: "User doesn't exists",
                Status: 400,
                Success: false
            })
        } else {

            let isActive = user.IsAccountActive;
            let isVerified = user.IsEmailVerified;
            let hashedPassword = user.Password;

            let isCorrectPassword = await utils.encryption.comparePassword(Password, hashedPassword);

            if(!isActive || !isVerified) {
                res.status(400).json({
                    Success: false, Message: 'Account not activated/verified yet'
                })
            } else if(!isCorrectPassword) {
                res.status(400).json({
                    Success: false, Message: 'Incorrect password'
                })
            } else {

                const tokenService = new TokenService();

                let token = tokenService.getLoggedInUserToken(user);
                if(!token) {
                    res.status(400).json({
                        Success: false,
                        Message: 'Token generation failed for logged in user'
                    })
                } else {
                    res.status(200).json({
                        Success: true,
                        Token: token
                    })
                }
            }
        }
    }
};

module.exports = login;