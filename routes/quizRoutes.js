const express = require('express');
const { getQuizzes, getQuizById, submitQuiz } = require('../controllers/quizController');

const router = express.Router();

router.route('/').get(getQuizzes); 
router.route('/:id').get(getQuizById);
router.route('/:id/submit').post(submitQuiz);

module.exports = router;