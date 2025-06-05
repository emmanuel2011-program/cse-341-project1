const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
// Use environment variable DB_URL if set, otherwise fallback to local MongoDB
db.url = process.env.DB_URL || 'mongodb://localhost:27017/yourdbname';

db.mongoose = mongoose;
db.theme = require('./theme.js')(mongoose);
db.user = require('./user.js')(mongoose);

module.exports = db;
