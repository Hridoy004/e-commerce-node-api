const UserService = require('../services/user-service');

const userProfileApi = async (req, res, next) => {

    const payload = req.payload;
    let userId = payload.UserId;
    let userService = new UserService();
    let userDetails = await userService.getUserDetailsById(userId);

    res.json({
        Success: true,
        Status: 200,
        User: userDetails
    })
};

module.exports = userProfileApi;