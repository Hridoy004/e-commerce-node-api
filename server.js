const Database = require('./database');

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

// middle wares here
app.use(bodyParser.json());

const authentication = require('./authentication');
const verification = require('./verification');

// loading module here
authentication(app);
verification.verification(app);

app.listen(3000, () => {

    // console.log("checking env variables");

   // console.log(process.env);

    console.log('server is running on port 3000');
    new Database().connect().then(() => {
        console.log('database connected');
    });
})