const jwt = require('jsonwebtoken');

class TokenService {

    constructor() {
        this.secret_key = process.env.JWT_SECRET_KEY || null;
    }

    getPayLoadFromUser(user) {
        return {
            Salutation: user.Salutation,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            UserId: user._id,
            Roles: user.Roles,
            loggedIn: true,
            PhoneNumber: user.PhoneNumber,
            UserName: user.UserName
        }
    }

    getLoggedInUserToken(user) {

       let payload = this.getPayLoadFromUser(user);
       if(!this.secret_key) {
           return null;
       }
       let token = jwt.sign(
           payload,
           this.secret_key,
           { expiresIn: 7 * 60, audience: '*', algorithm: 'HS256'});
       return token;
    }

}

module.exports = TokenService;