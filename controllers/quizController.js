const Quiz = require('../models/quiz.js');
const Question = require('../models/question');
const { success, error } = require('../helpers/response.js');

function create(req, res) {
    if (!req.headers.authorization) {
        return error(res, "Haven't login yet", 401)
    }
    // if (process.env.SECRET_KEY != 'roomMaster') {
    //     return error(res, "Only Room Master can create question!", 401)
    // }

    let newQuiz = new Quiz({
        name: req.body.name,
        questions:[]
    })

    newQuiz.save()
        .then(data => {
            success(res, data, 201)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

// function findAll()

async function addQuestion(req, res) {
    try {
        let quiz = await Quiz.findById(req.params.id);
        let question = await Question.findById(req.headers.add);

        if (!quiz || !question) {
            return error(res, "Quiz or question doesn't seem to be exist", 422)
        }

        if (quiz.questions.length < 11) {
            quiz.questions.push(question.id);
            await quiz.save();

            success(res, quiz, 200)
        }
        else {
            return error(res, "This quiz already has 10 questions!", 422)
        }
    }
    catch (err) {
        error(res, err, 422)
    }
}

function findAll(req, res) {
    Quiz.find()
        .then(data => {
            success(res, data, 200)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

module.exports = {
    create,
    addQuestion,
    findAll
}