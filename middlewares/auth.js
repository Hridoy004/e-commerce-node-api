const TokenService = require("../services/token-service");

const TOKEN_EXEMPTED_URLS = [
    '/authentication/login',
    '/authentication/register',
    '/verify'
]

const unAuthorised = (res) => {
    res.status(401).json({
        Success: false,
        Status: 401
    })
}

const isTokenExempted = (req) => {
    let url = req.url.toLowerCase();
    if(url.indexOf("?")) {
        let tokens = url.split("?");
        url = tokens[0];
    }
    console.log(url);
    return TOKEN_EXEMPTED_URLS.indexOf(url) >= 0;
}

const authenticate = (req) => {

    const bearerToken = req.headers.authorization;
    if(!bearerToken) {
        return false;
    }

    const tokens = bearerToken.split(" ");
    if(tokens.length === 2) {
        let token = tokens[1];
        let isBearer = tokens[0] === "Bearer";

        if(!isBearer) {
            return false;
        }

        let tokenService = new TokenService();
        let payload = tokenService.verifyToken(token);

        req.payload = payload || {};

        if(!payload) {
            return false;
        }
    }
    return true;
}

const authenticationMiddleware = (req, res, next) => {
    if(isTokenExempted(req)) {
        next();
    } else if(!authenticate(req)) {
        unAuthorised(res);
    } else {
        next();
    }
};

module.exports = authenticationMiddleware;