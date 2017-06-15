import express from 'express';

import Candidate from '../models/candidate';

const router = express.Router();

router.get('/', (req, res) => {
  Candidate.find()
    .then(candidates => res.json({ candidates }))
    .catch(error => res.status(500).json({ error }));
});

router.post('/', (req, res) => {
  const { email, first_name, last_name, primary_skill, job_function, notes } = req.body;

  Candidate.create({ email, first_name, last_name, primary_skill, job_function, notes })
    .then(candidate => res.send(candidate))
    .catch(error => res.status(500).json({ error }));
});
// router.get('/:id', (req, res) => {
//   User.findOne({ $or: [{ username: req.params.id }, { email: req.params.id }] })
//     .then(user => res.json({ user }))
//     .catch(error => res.status(500).json({ error }));
// });

// router.get('/id/:id', (req, res) => {
//   User.findOne({ _id: req.params.id })
//     .then(user => res.json({ user }))
//     .catch(error => res.status(500).json({ error }));
// });


// router.get('/:_id', (req, res) => {
//   Candidate.findOne({ _id: req.params._id })
//     .then(candidate => res.json({ candidate }))
//     .catch(error => res.status(500).json({ error }));
// });

// router.put('/:id', (req, res) => {
//   validateUser(req.body, validate).then(({ errors, isValid }) => {
//     if (isValid) {
//       const { username, email, password, first_name, last_name, primary_skill, job_function, notes } = req.body;
//       const password_digest = bcrypt.hashSync(password, 10);

//       User.findByIdAndUpdate(
//         { _id: req.params.id },
//         { $set: { username, email, first_name, last_name, job_function, primary_skill, notes, password_digest } })
//         .then(() => {
//           User.findOne({ _id: req.params.id }).then(user => res.json({ user }));
//         })
//         .catch(error => res.status(500).json({ error }));
//     } else {
//       res.status(400).json(errors);
//     }
//   });
// });

// router.delete('/:id', (req, res) => {
//   User.findByIdAndRemove({ _id: req.params.id })
//     .then(user => res.json({ user }))
//     .catch(error => res.status(500).json({ error }));
// });

export default router;
