const TokenService = require('../services/token-service');
const UserService = require('../services/user-service');

const unAuthorised = (res) => {
    res.status(401).json({
        Success: false,
        Status: 401
    })
}

const userProfileApi = async (req, res, next) => {

    const bearerToken = req.headers.authorization;
    if(!bearerToken) {
        unAuthorised(res);
        return;
    }

    const tokens = bearerToken.split(" ");
    if(tokens.length === 2) {
        let token = tokens[1];
        let isBearer = tokens[0] === "Bearer";

        if(!isBearer) {
            unAuthorised(res);
            return;
        }

        let tokenService = new TokenService();
        let payload = tokenService.verifyToken(token);

        if(!payload) {
            unAuthorised(res);
            return;
        }

        let userId = payload.UserId;
        let userService = new UserService();
        let userDetails = await userService.getUserDetailsById(userId);

        console.log(userId);
        res.json({
            Success: true,
            Status: 200,
            User: userDetails
        })

    } else {
        unAuthorised(res);
    }
};

module.exports = userProfileApi;