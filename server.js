const Database = require('./database');

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

// middle wares here
app.use(bodyParser.json());

const authentication = require('./authentication');

// loading module here
authentication(app);

app.listen(3000, () => {
    console.log('server is running on port 3000');
})