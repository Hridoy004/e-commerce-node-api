const User = require('../schemas/user');
const { v4: uuidv4 } = require('uuid');
const e = require("express");


class UserService {

    constructor() {
    }

    async createNewUser(firstName, lastName, email, hashedPassword, roles) {

       try {
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
           return ack && ack._id;
       } catch(e) {
           console.log(e);
           return null;
       }

    }

    async isUserAlreadyExists(email) {
        let response = await User.findOne({ Email: email });
        return response != null;
    }

    async deleteUserById(userId) {
        await User.deleteOne({_id: userId});
    }

    async verifyUser(userId) {
        const filter = { _id: userId };
        const update = { IsAccountActive: true, IsEmailVerified: true };
        await User.updateOne(filter, update);
    }

    async getUserByEmail(email) {
        return await User.findOne({ Email: email });
    }

    async getUserDetailsById(userId) {
        let user = await User.findOne({ _id: userId });
        if(!user)
            return null;
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

}

module.exports = UserService;