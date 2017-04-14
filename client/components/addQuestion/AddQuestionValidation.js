export default (values) => {
  const errors = {};
  const answersArrayErrors = [];

  if (!values.answers || !values.answers.length) {
    errors.answers = { _error: 'At least one member must be entered' };
  } else {
    values.answers.forEach((answer, answerIndex) => {
      const answerErrors = {};
      if (!answer || !answer['name-0']) {
        answerErrors.firstName = 'Required';
        answersArrayErrors[answerIndex] = answerErrors;
      }
      if (!answer || !answer.lastName) {
        answerErrors.lastName = 'Required';
        answersArrayErrors[answerIndex] = answerErrors;
      }
    });
  }

  if (answersArrayErrors.length) {
    errors.answers = answersArrayErrors;
  }

  return errors;
};
