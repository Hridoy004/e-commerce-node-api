const User = require('../schemas/user');
const category = require("../schemas/category");

const getUser = async (req, res) => {
    const userList = await User.find()

    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
};

const getUserId = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(500).json({ message: 'The user with the given ID was not found.' });
    }
    res.status(200).send(user);
};


const updateUserId = async (req, res) => {
    const userExist = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            Salutation: req.body.Salutation,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
            UserName: req.body.UserName,
        },
        { new: true }
    );

    if (!user) return res.status(400).send('the user cannot be created!');

    res.send(user);
};

const deleteUserId = async (req, res) => {
    User.findByIdAndRemove(req.params.id).then(users => {
        let response = {
            Message: 'The user is deleted!',
            Success: true
        }
        if (users) {
            return res.status(200).json(response);
        } else {

            let response = {
                Message: 'User not found!',
                Success: false
            }
            return res.status(404).json(response);
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    })
}

const getUserCount = async (req, res) => {
    const userCount = await User.countDocuments((count) => count);

    if (!userCount) {
        res.status(500).json({ success: false });
    }
    res.send({
        userCount: userCount
    });
};

module.exports = {
    getUser: getUser,
    getUserId: getUserId,
    updateUserId: updateUserId,
    deleteUserId: deleteUserId,
    getUserCount: getUserCount
};
