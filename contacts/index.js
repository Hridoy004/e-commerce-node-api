const contact = require('./contact');
const deleteContact = require('./delete-contact');
const asyncHandler = require('express-async-handler');

const contacts = (app) => {
    app.post('/api/contact', asyncHandler(contact.addContact));
    app.get('/api/contact', asyncHandler(contact.getContact));
    app.get('/api/contact/:id', asyncHandler(contact.getContactById));
    app.delete('/api/contact/:id', asyncHandler(deleteContact));
}

module.exports = contacts;