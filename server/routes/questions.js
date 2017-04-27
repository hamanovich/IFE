import express from 'express';

import Question from '../models/question';

const router = express.Router();

router.get('/', (req, res) => {
  Question.find()
    .then(ans => res.json({ ans }));
});

router.get('/:filter', (req, res) => {
  const { filter } = req.params;
  const splitted = filter.split(':');
  const type = splitted[0];
  let value = splitted[1];

  if (type === 'level' || type === 'section') {
    value = { $eq: value };
  }

  Question.find({ [type]: value })
    .then(ans => res.json({ ans }));
});

router.delete('/:id', (req, res) => {
  Question.findByIdAndRemove({ _id: req.params.id })
    .then(ans => res.json({ ans }));
});

export default router;
