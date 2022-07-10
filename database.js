const mongoose = require('mongoose');

const username = 'root';
const password = 'pZuwjsHgrz2k089O';
const database = 'project-e-commerce';

const host = `mongodb+srv://${username}:${password}@e-commerce-01.a1lyhuw.mongodb.net/${database}`

const authentication = {
    readPreference: 'primary',
}

class Database{

    constructor() {
    }

    buildURI(){
        const keys = Object.keys(authentication);
        const arr = keys.map(key => `${key}=${authentication[key]}`);
        const params = arr.join("&")
        return `${host}?${params}`;
    }

    async connect(){
        let uri = this.buildURI();
        await mongoose.connect(uri);
    }

    disconnect(){
        mongoose.connection.close();
    }
}

module.exports = Database;