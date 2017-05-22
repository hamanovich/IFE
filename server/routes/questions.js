import express from 'express';

import Question from '../models/question';
import User from '../models/user';

const router = express.Router();

router.get('/', (req, res) => {
  Question.find()
    .then(ans => res.json({ ans }))
    .catch(error => res.status(500).json({ error }));
});

router.get('/id/:id', (req, res) => {
  Question
    .findOne({ _id: req.params.id })
    .then(ans => res.json({ ans }))
    .catch(error => res.status(500).json({ error }));
});

router.post('/add', (req, res) => {
  const { question, skill, level, theory, answer, answers, notes, userId, votes, lastModified } = req.body;
  Question.create({ question, skill, level, theory, answer, answers, notes, author: userId, votes, lastModified })
    .then((question) => {
      User.findByIdAndUpdate({ _id: userId }, { $push: { questions: question._id } }, { safe: true, upsert: true, new: true })
        .then(() => res.send(question))
        .catch(err => res.status(500).json({ error: err }));
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.put('/:id', (req, res) => {
  const { question, skill, level, theory, answer, answers, notes, username, lastModified } = req.body;

  Question.findByIdAndUpdate({ _id: req.params.id }, { $set: { question, skill, level, theory, answer, answers, notes, username, lastModified } })
    .then(() => {
      Question.findOne({ _id: req.params.id })
        .then(que => res.json({ que }))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.put('/one/:id', (req, res) => {
  Question.findByIdAndUpdate({ _id: req.params.id }, { $set: { [req.body.field]: req.body.value, lastModified: req.body.lastModified } })
    .then(() => Question.findOne({ _id: req.params.id })
      .then(que => res.json({ que }))
      .catch(error => res.status(500).json({ error })));
});

router.put('/vote/:id', (req, res) => {
  Question.findByIdAndUpdate({ _id: req.params.id }, { $push: { [req.body.field]: req.body.value } })
    .then(() => Question.findOne({ _id: req.params.id })
      .then((que) => {
        User.findByIdAndUpdate({ _id: req.body.value }, { $push: { [req.body.field]: que._id } })
          .then(() => res.json({ que }))
          .catch(err => res.status(500).json({ error: err }));
      }))
    .catch(error => res.status(500).json({ error }));
});

router.delete('/:id', (req, res) => {
  Question.findByIdAndRemove({ _id: req.params.id })
    .then((ans) => {
      User.findByIdAndUpdate({ _id: ans.author }, { $pull: { questions: ans._id } })
        .then(() => res.json({ ans }))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
});

export default router;
