const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {
        type: String,
        unique: 'Name is already taken',
        required: 'Name is still blank'
    },
    password: {
        type: String,
        required: "Password is still blank"
    },
    secret_key: {
        type: String
    }
})

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;