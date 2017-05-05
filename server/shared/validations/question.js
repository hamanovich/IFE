import Validator from 'validator';

export default (values) => {
  const errors = {};

  if (values.question && Validator.isEmpty(values.question)) {
    errors.question = { _error: 'Question field is required' };
  }
  if (values.theory && Validator.isEmpty(values.theory)) {
    errors.theory = { _error: 'Type of question is required' };
  }

  if (values.answer && Validator.isEmpty(values.answer)) {
    errors.answer = { _error: 'At least one answer should be provided' };
  }

  if (values.answers !== undefined) {
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
