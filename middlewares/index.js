const auth = require('./auth');
const cors = require('cors');

const initializeMiddlewares = (app) => {
    app.use(cors());
    app.use(auth);
}

module.exports = initializeMiddlewares;
