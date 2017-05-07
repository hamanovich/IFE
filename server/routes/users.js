import express from 'express';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import commonValidation from '../shared/validations/signup';
import User from '../models/user';

const router = express.Router();

function validateInput(data, otherValidations) {
  const { errors } = otherValidations(data);
  const { username, email } = data;

  return User.find({
    $or: [
      { username },
      { email }
    ]
  }).then((user) => {
    if (user) {
      if (user.username === data.username) {
        errors.username = 'There is user with such username';
      }

      if (user.email === data.email) {
        errors.email = 'There is user with such email';
      }
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  });
}

router.get('/:id', (req, res) => {
  User.find({
    $or: [
      { username: req.params.id },
      { email: req.params.id }]
  }).then(user => res.json({ user }));
});

router.post('/', (req, res) => {
  validateInput(req.body, commonValidation).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, email, primary_skill, job_function, avatar, password, notes } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);
      const avatar_image = avatar.img.toString('base64');

      User.create({ username, email, primary_skill, job_function, avatar_image, password_digest, notes })
        .then(user => res.send(user))
        .catch(err => res.status(500).json({ error: err }));
    } else {
      res.status(400).json(errors);
    }
  });
});

export default router;
