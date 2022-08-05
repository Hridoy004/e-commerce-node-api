const saltRounds = 10;

const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
    let salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword,salt);
}

const comparePassword = async (plainPassword, hash) => {
    return await bcrypt.compare(plainPassword, hash);
}

module.exports = {
    hashPassword: hashPassword,
    comparePassword: comparePassword
};
