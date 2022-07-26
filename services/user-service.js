const User = require('../schemas/user');
const { v4: uuidv4 } = require('uuid');


class UserService {

    constructor() {
    }

    async createNewUser(firstName, lastName, email, hashedPassword, roles) {

       let user = new User({
            _id: uuidv4(),
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Roles: roles,
            IsAccountActive: false,
            IsEmailVerified: false,
            IsTwoFactorAuthenticationEnabled: false,
            IsPhoneNumberVerified: false,
            Password: hashedPassword,
            LogInCount: 0,
        });

       let ack = await user.save();
       return ack !== null;

    }

    async isUserAlreadyExists(email) {
        let response = await User.findOne({ Email: email });
        return response != null;
    }

}

module.exports = UserService;