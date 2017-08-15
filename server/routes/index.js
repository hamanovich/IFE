import express from 'express';

const router = express.Router();

const questionsController = require('./questions');
const authController = require('./auth');
const usersController = require('./users');

router.get('/users/:id', usersController.getUser);
router.get('/users/id/:id', usersController.getUserById);
router.post('/users', usersController.createUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

router.post('/auth', authController.authUser);
router.post('/auth/forgot', authController.forgotUser);
router.get('/auth/reset/:token', authController.getResetPassword);
router.post('/auth/reset/:token', authController.postResetPassword);

router.get('/questions', questionsController.getQuestions);
router.get('/questions/page/:page', questionsController.getQuestions);
router.get('/questions/tags', questionsController.getQuestionsBySkills);
router.get('/questions/tags/:tag', questionsController.getQuestionsBySkills);
router.get('/questions/id/:id', questionsController.getQuestionById);
router.post('/questions/add', questionsController.addQuestion);
router.put('/questions/:id', questionsController.updateQuestion);
router.put('/questions/one/:id', questionsController.updateQuestionField);
router.put('/questions/vote/:id', questionsController.voteQuestion);
router.delete('/questions/:id', questionsController.deleteQuestion);

module.exports = router;
