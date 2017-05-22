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
          _id: user._id,
          username: user.username,
          email: user.email
        };
        const token = jwt.sign(userData, config.jwtSecret);

        res.json({ ...userData, token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    });
});

export default router;
