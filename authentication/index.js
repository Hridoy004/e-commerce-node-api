const token = require('./token');
const registration = require('./registration');
const login = require('./login');
const user = require('./users');
const forgetPassword = require('./forget-password');
const resetPassword = require('./reset-password');

const asyncHandler = require('express-async-handler');


const authentication = (app) => {
    app.get('/authentication/token', asyncHandler(token.getAnonymousToken));
    app.get('/authentication/ping', asyncHandler(token.ping));
    app.post('/authentication/register', asyncHandler(registration));
    app.post('/authentication/login', asyncHandler(login));
    app.get('/authentication/user', asyncHandler(user.getUser));
    app.delete('/authentication/user/:id', asyncHandler(user.deleteUserId));
    app.get('/authentication/user/count', asyncHandler(user.getUserCount));
    app.post('/authentication/forget-password', asyncHandler(forgetPassword));
    app.put('/authentication/reset-password', asyncHandler(resetPassword));
};

module.exports = authentication;