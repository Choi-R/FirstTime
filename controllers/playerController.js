const Player = require('../models/player.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { success, error } = require('../helpers/response.js')

function create(req, res) {
    let newPlayer = new Player({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    });

    newPlayer.save()
        .then(() => {
            success(res, newPlayer, 201)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

function login(req, res) {
    Player.findOne({ name: req.body.name })
        .then(data => {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                if (req.body.secret == "roomMaster") {
                    let token = jwt.sign({ _id: data._id, role: 'roomMaster' }, process.env.SECRET_KEY);
                }
                else {
                    let token = jwt.sign({ _id: data._id, role: 'player' }, process.env.SECRET_KEY);
                }
                success(res, token, 200)
            }
            else {
                error(res, "Password is wrong", 422);
            }
        })
        .catch(() => {
            error(res, "Name doesn't seem to be exist", 422)
        })
}

function findAll(req, res) {
    Player.find()
        .then(data => {
            success(res, data, 200)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

module.exports = {
    create,
    login,
    findAll
}