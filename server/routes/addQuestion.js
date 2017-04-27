import express from 'express';

import Question from '../models/question';

const router = express.Router();

router.post('/', (req, res) => {
  const { question, section, level, theory, answer, answers, notes, username } = req.body;

  Question.create({ question, section, level, theory, answer, answers, notes, author: username })
    .then(question => res.send(question))
    .catch(err => res.status(500).json({ error: err }));
});

export default router;
