const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    Salutation: { type: String, default: null },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true },
    UserName: { type: String, default: null },
    PhoneNumber: { type: String, default: null },
    Roles: { type: Array, default: [], required: true },
    IsAccountActive: { type: Boolean, default: false },
    IsEmailVerified: { type: Boolean, default: false },
    IsTwoFactorAuthenticationEnabled: { type: Boolean, default: false },
    IsPhoneNumberVerified: { type: Boolean, default: false },
    Password: { type: String, required: true },
    LogInCount: { type: Number, required: false, default: 0 },
    LastLoginTime: { type: Date, required: false, default: null },
    CreateDate: { type: Date, required: false, default: Date.now },
    LastUpdateDate: { type: Date, required: false, default: Date.now },
    LastUpdatedBy: { type: String, required: false, default: null }
});

module.exports = mongoose.model('User', userSchema, 'Users');