const token = require('./token');
const registration = require('./registration');
const login = require('./login');
const user = require('./users');
const asyncHandler = require('express-async-handler');


const authentication = (app) => {
    app.get('/authentication/token', asyncHandler(token.getAnonymousToken));
    app.get('/authentication/ping', asyncHandler(token.ping));
    app.post('/authentication/register', asyncHandler(registration));
    app.post('/authentication/login', asyncHandler(login));
    app.get('/authentication/user', asyncHandler(user.getUser));
    app.delete('/authentication/user/:id', asyncHandler(user.deleteUserId));
};

module.exports = authentication;