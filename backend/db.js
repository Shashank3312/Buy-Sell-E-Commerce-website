const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

mongoose.connect(url)
    .then(() => {
        console.log('Connected to the database');   
    }).catch((err) => {
        console.log('Error connecting to the database', err);
    });
