const User = require('../schemas/user');
const utils = require('../utils');

const registration = async (req, res) => {

    const { FirstName, LastName, Email, Password } = req.body;

    if(FirstName && LastName && Email && Password) {

        let hashedPassword = await utils.hashPassword(Password);
        console.log(hashedPassword);

        res.json({Hash: hashedPassword});

    } else {
        res.status(400).json(
            {"Message": "Missing required fields"}
        );
    }
};

module.exports = registration;