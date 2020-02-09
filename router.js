const express = require('express');
const router = express.Router();
const player = require('./controllers/playerController.js');
const question = require('./controllers/questionController');
const quiz = require('./controllers/quizController');
const authenticate = require('./middlewares/authPlayer.js');
const authorize = require('./middlewares/authRoomMaster.js')

// Player router
router.post('/players-register', player.create);
router.put('/players-login', player.login);
router.get('/players', authenticate, player.findAll);

// Question router
router.route('/questions')
    .post(authorize, question.create)
    .get(authorize, question.findAll)
router.delete('/questions/:id', authorize, question.remove)

// Quiz router
router.post('/quizes', authorize, quiz.create)
router.put('/quizes/:id', authorize, quiz.addQuestion)
router.get('/quizes', authenticate, quiz.findAll)
router.post('/quizes-answer/:id', authenticate, quiz.answer)
router.delete('/quizes/:id', authorize, quiz.remove)

module.exports = router;