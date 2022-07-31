const VerificationService = require('./services/verification');
const asyncHandler = require('express-async-handler');

const verifyRoute = require('./routes/verify');

const verification = (app) => {
    app.get('/verify', asyncHandler(verifyRoute));
};

module.exports = {
    Services: {
        VerificationService: VerificationService
    },
    verification: verification
}