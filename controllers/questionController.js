const Question = require('../models/question.js');
const { success, error } = require('../helpers/response.js');

function create(req, res) {
    if (!req.headers.authorization) {
        return error(res, "Haven't login yet", 401)
    }
    // if(process.env.SECRET_KEY != 'roomMaster'){
    //     return error(res, "Only Room Master can create question!", 401)
    // }
    let newQuestion = new Question({
        //question_id: ...
        problem: req.body.problem,
        options: req.body.options,
        answer: req.body.answer
    })

    newQuestion.save()
        .then(data => {
            success(res, data, 200)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

function findAll(req, res) {
    Question.find()
        .then(data => {
            success(res, data, 201)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

module.exports = {
    create,
    findAll
}
//