const asyncHandler = require('express-async-handler');
const Quiz = require('../models/Quiz');

// Fetch all quizzes
const getQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// Fetch a quiz by ID
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// Submit quiz answers and calculate score
const submitQuiz = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      score += 1;
    }
  });

  const totalQuestions = quiz.questions.length;
  const result = {
    score,
    totalQuestions,
    percentage: (score / totalQuestions) * 100,
  };

  res.json(result);
});

module.exports = { getQuizzes, getQuizById, submitQuiz };