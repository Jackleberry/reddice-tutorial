import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import User from '../models/user';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();


function validateInput(data, commonValidations) {
  let { errors } = commonValidations(data);

  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  }).fetch().then(user => {
    if (user) {
      if (user.get('email') == data.email) {
        errors.email = 'A user with this email already exists.';
      }
      if (user.get('username') == data.username) {
        errors.username = 'A user with this username already exists.';
      }
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  });
}

router.get('/:identifier', (req, res) => {

  User.query({
    select: ["username", "email"],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  }).fetch().then(user => {
    res.json({ user });
  });

});

router.post('/', (req, res) => {

  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, password, timezone, email } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);

      User.forge({
        username, timezone, email, password_digest
      }, {
        hasTimestamps: true
      }).save()
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }));
    } else {
      res.status(400).json(errors);
    }
  });

});

export default router;
