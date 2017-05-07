export default (values) => {
  const errors = {};

  if (!values.question) {
    errors.question = 'Question field is required';
  }
  if (!values.theory) {
    errors.theory = 'Type of question is required';
  }

  if (!values.answer) {
    errors.answer = 'At least one answer should be provided';
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
