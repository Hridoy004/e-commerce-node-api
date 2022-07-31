const hashPassword = require('./encryption');
const randomString = require('./random');

module.exports = {
    encryption: {
        hashPassword: hashPassword
    },
    randomString: randomString
}