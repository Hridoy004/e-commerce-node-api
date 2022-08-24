const userProfileApi = require('./user-profile');
const asyncHandler = require('express-async-handler');

const profile = (app) => {
    app.get('/user/profile', asyncHandler(userProfileApi));
}

module.exports = profile;