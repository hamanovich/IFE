import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (values.email && !Validator.isEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Confirmation is required';
  }

  if (values.password && values.passwordConfirmation && !Validator.equals(values.password, values.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};
