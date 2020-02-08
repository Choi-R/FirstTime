const express = require('express');
const router = express.Router();
const player = require('./controllers/playerController.js');
const question = require('./controllers/questionController');
const quiz = require('./controllers/quizController');

// Player router
router.post('/players-register', player.create);
router.put('/players-login', player.login);
router.get('/players', player.findAll);

// Question router
router.route('/questions')
    .post(question.create)
    .get(question.findAll)
router.delete('/questions/:id', question.remove)

// Quiz router
router.post('/quizes',quiz.create)
router.put('/quizes/:id',quiz.addQuestion)
router.get('/quizes', quiz.findAll)
router.post('/quizes-answer/:id', quiz.answer)
router.delete('/quizes/:id', quiz.remove)

module.exports = router;