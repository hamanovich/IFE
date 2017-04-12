import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'Username or Email is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return { errors, isValid: isEmpty(errors) };
}
