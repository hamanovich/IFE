import express from 'express';
import bcrypt from 'bcrypt';

import validate from '../validations/signup';
import validateUser from '../validations/user';
import User from '../models/user';

const router = express.Router();

router.get('/:id', (req, res) => {
  User.findOne({ $or: [{ username: req.params.id }, { email: req.params.id }] })
    .then(user => res.json({ user }))
    .catch(error => res.status(500).json({ error }));
});

router.get('/id/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(user => res.json({ user }))
    .catch(error => res.status(500).json({ error }));
});

router.post('/', (req, res) => {
  validateUser(req.body, validate).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, email, password, first_name, last_name, primary_skill, job_function, notes, questions } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);

      User.create({ username, email, first_name, last_name, primary_skill, job_function, notes, password_digest, questions })
        .then(user => res.send(user))
        .catch(error => res.status(500).json({ error }));
    } else {
      res.status(400).json(errors);
    }
  });
});

router.put('/:id', (req, res) => {
  console.log(req.body);
  validateUser(req.body, validate).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, email, password, first_name, last_name, primary_skill, job_function, notes } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);

      console.log(username);

      User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { username, email, first_name, last_name, job_function, primary_skill, notes, password_digest } })
        .then(() => {
          User.findOne({ _id: req.params.id }).then(user => res.json({ user }));
        })
        .catch(error => res.status(500).json({ error }));
    } else {
      res.status(400).json(errors);
    }
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id })
    .then(user => res.json({ user }))
    .catch(error => res.status(500).json({ error }));
});

export default router;
