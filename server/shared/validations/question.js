import Validator from 'validator';

export default (values) => {
  const errors = {};

  if (Validator.isEmpty(values.question)) {
    errors.question = { _error: 'Question field is required' };
  }

  if (Validator.isEmpty(values.answer)) {
    errors.answer = { _error: 'At least one answer should be provided' };
  }

  if (values.answers) {
    const answersArrayErrors = [];

    values.answers.forEach((answer, answerIndex) => {
      const answerErrors = {};

      if (!answer || !answer.text) {
        answerErrors.text = 'Add answer or remove';
        answersArrayErrors[answerIndex] = answerErrors;
      }
    });

    if (answersArrayErrors.length) {
      errors.answers = answersArrayErrors;
    }
  }

  return errors;
};
