import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {
  const { identifier, password } = req.body;

  User.findOne({ $or: [{ username: identifier }, { email: identifier }] })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password_digest)) {
        const userData = {
          _id: user.id,
          username: user.username,
          email: user.email,
          avatar_image: user.avatar_image.toString('binary'),
          job_function: user.job_function,
          primary_skill: user.primary_skill,
          notes: user.notes,
          questions: user.questions,
          votes: user.votes
        };
        const token = jwt.sign(userData, config.jwtSecret);

        res.json({ ...userData, token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    });
});

export default router;
