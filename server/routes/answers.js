import express from 'express';

import Question from '../models/question';

const router = express.Router();

const selectData = ['question', 'section', 'level', 'theory', 'answer', 'answers', 'username', 'notes'];

router.get('/', (req, res) => {
  Question.query({
    select: selectData
  }).fetchAll().then(ans => res.json({ ans }));
});

router.get('/:type', (req, res) => {
  console.log(req.params.type);
  Question.query({
    select: selectData,
    where: { theory: req.params.type },
    orWhere: { level: req.params.type }
  }).fetchAll().then(ans => res.json({ ans }));
});

export default router;
