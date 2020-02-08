const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    // question_id: {
    //     type: Number,
    //     unique: true,
    //     required: true
    // },
    problem: {
        type: String,
        unique: true,
        required: true
    },
    options: {
        type: Object,
        required: true
    },
    answer: {
        type: String,
        required: "Only answer with one of the available options"
    }
})

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;