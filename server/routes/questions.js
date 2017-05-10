import express from 'express';
import Question from '../models/question';

const router = express.Router();

router.get('/', (req, res) => {
  Question.find()
    .then(ans => res.json({ ans }))
    .catch(error => res.status(500).json({ error }));
});

router.get('/id/:id', (req, res) => {
  Question.findOne({ _id: req.params.id })
    .then(ans => res.json({ ans }))
    .catch(error => res.status(500).json({ error }));
});

router.post('/add', (req, res) => {
  const { question, skill, level, theory, answer, answers, notes, username } = req.body;

  Question.create({ question, skill, level, theory, answer, answers, notes, author: username })
    .then(question => res.send(question))
    .catch(err => res.status(500).json({ error: err }));
});

router.put('/:id', (req, res) => {
  const { question, skill, level, theory, answer, answers, notes, username } = req.body;

  Question.findByIdAndUpdate({ _id: req.params.id }, { $set: { question, skill, level, theory, answer, answers, notes, username } })
    .then(() => Question.findOne({ _id: req.params.id }).then(que => res.json({ que })))
    .catch(error => res.status(500).json({ error }));
});


router.put('/one/:id', (req, res) => {
  Question.findByIdAndUpdate({ _id: req.params.id }, { $set: { [req.body.field]: req.body.value } })
    .then(() => Question.findOne({ _id: req.params.id }).then(que => res.json({ que })))
    .catch(error => res.status(500).json({ error }));
});

router.delete('/:id', (req, res) => {
  Question.findByIdAndRemove({ _id: req.params.id })
    .then(ans => res.json({ ans }))
    .catch(error => res.status(500).json({ error }));
});

export default router;
