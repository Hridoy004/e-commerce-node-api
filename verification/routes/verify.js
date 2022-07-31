const VerificationService = require('../services/verification');
const UserService = require('../../services/user-service');

const verify = async (req, res) => {

    const token = req.query && req.query.token;

    if(!token) {
        res.status(400).json({
            Status: 400,
            Verification: 'FAILED',
            Success: false
        })
    } else {

        const verificationService = new VerificationService();
        let userId = await verificationService.validateAndUpdateToken(token);
        if(!userId){
            res.status(400).json({
                Status: 400,
                Verification: 'INVALID_TOKEN_OR_EXPIRED',
                Success: false
            })
        } else {

            const userService = new UserService();
            await userService.verifyUser(userId);
            res.status(200).json({
                Status: 200,
                Verification: 'DONE',
                Success: true
            })
        }
    }
}

module.exports = verify;