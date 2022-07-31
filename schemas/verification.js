const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    UserId: { type: String, required: true },
    VerificationToken: {type: String, required: true },
    CreateDate: { type: Date, required: false, default: Date.now },
    IsExpired: { type: Boolean, default: false }
});

module.exports = mongoose.model('Verification', verificationSchema, 'Verifications');