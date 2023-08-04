const TokenService = require("../services/token-service");
const User = require('../schemas/user');
const utils = require("../utils");


const ResetPassword = async (req, res) => {
    const { Token, Password } = req.body;
    let hashedPassword = await utils.encryption.hashPassword(Password);

    let tokenService = new TokenService();
    let payload = tokenService.resetPasswordVerifyToken(Token);
    if(!payload) {
        let response = {
            Message: 'Invalid or expired token',
            Success: false
        }
        res.status(400).json(response);
    }

    const filter = {Email: payload.Email};
    const update = {Password: hashedPassword};
    const options = {new: true};
    const resetPassword = await User.findOneAndUpdate(
        filter, update, options
    ).select('-Password');

    if(!resetPassword) {
        let response = {
            Message: 'Password reset failed',
            Success: false
        }
        res.status(400).json(response);
    }

    let response = {
        Message: 'Password reset successfully',
        Success: true
    }
    res.status(200).json(response);

}

module.exports = ResetPassword;