const dotenv = require('dotenv');
dotenv.config();
const MongoClient  = require('mongodb').MongoClient;

let database;

const initdb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    } 
    MongoClient.connect(process.env.MONGODBURL)
    .then((client) => {
        database = client.db();
        callback(null, database);
    });
};
const getdb = () => {
    if (!database) {
        throw new Error('Database is not initialized!');
    }
    return database;
};
module.exports = {
    initdb,
    getdb
};