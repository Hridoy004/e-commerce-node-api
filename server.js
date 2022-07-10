const Database = require('./database');
const User = require('./schemas/user');

//const bodyParser = require('body-parser');

const express = require('express');
const app = express();

// middle wares here
//app.use(bodyParser.json());

//const authentication = require('./authentication');

// loading module here
//authentication(app);

async function main() {
    const db = new Database();
    await db.connect();
    console.log('database connected');

    let users = await User.find({Roles: {'$eq' : null}});

    const user = new User({
        Name: 'jon.doe',
        Mobile: '+0293984989',
        Data: 'acdkdlf'
    });

    let response = await user.save();
    console.log(response);
}

app.listen(3000, () => {
    console.log('server is running on port 3000');
    new Database().connect().then(() => {
        console.log('database connected')
    });
})