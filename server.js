const express = require('express');
const mongodb = require('./data/database.js');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'))

mongodb.initdb((err) => {
    if (err) {
        console.log(err);
    } 
    else {
        app.listen(port, () => {console.log(`Database is Listening and node is Running on port ${port}`)});
    }
});