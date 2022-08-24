const testMiddleware = (req, res, next) => {
    console.log('inside the test middleware');
    next();
}

module.exports = testMiddleware;