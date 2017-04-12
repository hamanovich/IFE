import express from 'express';
import bcrypt from 'bcrypt';

import validateInput from '../shared/validations/signup';
import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (isValid) {
    const { username, email, password } = req.body;
    const password_digest = bcrypt.hashSync(password, 10);

    User.forge({
      username, email, password_digest
    }, { hasTimestamps: true }).save()
      .then(() => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }));
  } else {
    res.status(400).json(errors);
  }
});

export default router;
