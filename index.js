const express = require('express'); // Setup express
const app = express(); //Setup express
const mongoose = require('mongoose'); //Setup express
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('./router.js');
dotenv.config();

const env = process.env.NODE_ENV;
const dbConnection = {
    development: process.env.DB_CONNECTION
}

app.use(morgan('tiny'));

mongoose.connect(dbConnection[env], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('Database connected!'))
    .catch(err => console.log(err));

app.use(express.json()); // Sebuah middleware untuk ngeparse request yang content typenya json
app.use('/api/v1', router)
// app.use(express.urlencoded({}))             mungkin suatu saat perlu

module.exports = app
