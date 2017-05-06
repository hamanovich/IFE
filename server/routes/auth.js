import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {
  const { identifier, password } = req.body;

  User.find({
    $or: [
      { username: identifier },
      { email: identifier }]
  }).then((user) => {
    if (typeof user[0] !== 'undefined') {
      if (bcrypt.compareSync(password, user[0].password_digest)) {
        const ava = user[0].avatar_image ? user[0].avatar_image.toString('binary') : null;

        const token = jwt.sign({
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          avatar_image: ava
        }, config.jwtSecret);

        res.json({
          token,
          username: user[0].username,
          email: user[0].email,
          avatar_image: ava
        });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  });
});

export default router;
