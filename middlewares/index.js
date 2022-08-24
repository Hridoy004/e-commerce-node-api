const auth = require('./auth');
const test = require('./test');

const initializeMiddlewares = (app) => {
    app.use(auth);
    app.use(test);
}

module.exports = initializeMiddlewares;
