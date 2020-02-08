const jwt = require('jsonwebtoken');
const {error} = require('../helpers/response.js');

function auth(req, res, next){
    let token = req.headers.authorization;
    try{
        let payload = jwt.verify(token, process.env.SECRET_KEY);
        req.headers.authorization = payload._id;
        req.headers.role = payload.role;
        next()
    }
    catch(){
        return error(res, "Invalid token", 401)
    }
}

module.exports = auth;