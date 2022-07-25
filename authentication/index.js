const token = require('./token');
const registration = require('./registration');
const asyncHandler = require('express-async-handler');

const authentication = (app) => {
    app.get('/authentication/token', asyncHandler(token.getAnonymousToken));
    app.get('/authentication/ping', asyncHandler(token.ping));
    app.post('/authentication/register', asyncHandler(registration));
};

module.exports = authentication;