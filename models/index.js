const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
// Use environment variable for hosted DB, fallback to local MongoDB
db.url = process.env.DB_URL || 'mongodb://localhost:27017/project2';

db.mongoose = mongoose;
db.theme = require('./theme.js')(mongoose);
db.user = require('./user.js')(mongoose);

module.exports = db;
