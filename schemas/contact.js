const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
})

module.exports = mongoose.model('Contact', contactSchema, 'Contacts');
