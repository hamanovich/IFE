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
      const { username, email, primary_skill, job_function, avatar, password, notes, questions } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);
      const avatar_image = avatar.img.toString('base64');

      User.create({ username, email, primary_skill, job_function, avatar_image, password_digest, notes, questions })
        .then(user => res.send(user))
        .catch(error => res.status(500).json({ error }));
    } else {
      res.status(400).json(errors);
    }
  });
});

router.put('/:id', (req, res) => {
  validateUser(req.body, validate).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, email, primary_skill, job_function, avatar, password, notes } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);
      const avatar_image = avatar.img.toString('base64');

      User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { username, email, job_function, primary_skill, notes, password_digest, avatar_image } })
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
