const Database = require('./database');

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

// middle wares here
app.use(bodyParser.json());

const authentication = require('./authentication');
const verification = require('./verification');
const profile = require('./profile');
const middlewares = require('./middlewares');

// loading middlewares here

middlewares(app);


// loading module here
authentication(app);
verification.verification(app);
profile(app);

app.listen(3000, () => {

    // console.log("checking env variables");

    // console.log(process.env);
    /*  console.log(`Mail Address: ${process.env.MAIL_ADDRESS}`);
    console.log(`Mail Password: ${process.env.MAIL_PASSWORD}`);*/

    console.log('server is running on port 3000');
    new Database().connect().then(() => {
        console.log('database connected');
    });
})