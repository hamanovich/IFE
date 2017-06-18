import isEmail from 'validator/lib/isEmail';
import isEmpty from 'lodash/isEmpty';

export default (values) => {
  const errors = {};

  if (!values.forgot) {
    errors.forgot = 'Email is required';
  }

  if (values.forgot && !isEmail(values.forgot)) {
    errors.forgot = 'Email is invalid';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};
