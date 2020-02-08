const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
})

const Quiz = mongoose.model('Quiz', quizSchema);

Quiz.all = function () {
    return new Promise((resolve, reject) => {
        Quiz
            .find()
            // .select([
            //     'name', 'questions'
            // ])
            .populate('questions')
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = Quiz;