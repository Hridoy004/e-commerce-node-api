const contact = require('./contact');
const asyncHandler = require('express-async-handler');

const contacts = (app) => {
    app.post('/api/contact', asyncHandler(contact.addContact));
    app.get('/api/contact', asyncHandler(contact.getContact));
    app.get('/api/contact/:id', asyncHandler(contact.getContactById));
}

module.exports = contacts;