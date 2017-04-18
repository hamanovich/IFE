import express from 'express';
import authenticate from '../middlewares/authenticate';

import Question from '../models/question';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
  const { question, section, level, theory, answer, answers, notes, username } = req.body;

  Question.forge({
    question, section, level, theory, answer, answers, notes, username
  }, { hasTimestamps: true }).save()
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ error: err }));
});

export default router;
