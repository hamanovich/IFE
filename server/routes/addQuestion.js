import express from 'express';

import Question from '../models/question';

const router = express.Router();

router.post('/', (req, res) => {
  console.log('POST new question');
  const { question, skill, level, theory, answer, answers, notes, username } = req.body;

  Question.create({ question, skill, level, theory, answer, answers, notes, author: username })
    .then(question => res.send(question))
    .catch(err => res.status(500).json({ error: err }));
});

router.put('/:id', (req, res) => {
  console.log('PUT update', req.params.id);
  const { question, skill, level, theory, answer, answers, notes, username } = req.body;

  Question.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: { question, skill, level, theory, answer, answers, notes, username }
    }
  ).then(() => {
    Question.findOne({ _id: req.params.id }).then(que => res.json({ que }));
  });
});

export default router;
