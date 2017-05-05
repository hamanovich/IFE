import express from 'express';

import Question from '../models/question';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('GET ALL');
  Question.find()
    .then(ans => res.json({ ans }));
});

router.get('/id/:id', (req, res) => {
  console.log('GET ID', req.params.id);
  Question.findOne({ _id: req.params.id })
    .then(ans => res.json({ ans }));
});

router.put('/:id', (req, res) => {
  console.log('PUT --- ', req.body);
  Question.findByIdAndUpdate({ _id: req.params.id }, { $set: { [req.body.field]: req.body.value } })
    .then(() => {
      Question.findOne({ _id: req.params.id }).then(que => res.json({ que }));
    });
});

router.delete('/:id', (req, res) => {
  Question.findByIdAndRemove({ _id: req.params.id })
    .then(ans => res.json({ ans }));
});

export default router;
