import { createSelector } from 'reselect';

const entries = (obj) => {
  const result = {};

  Object.entries(obj).forEach(([key, value]) => { result[key] = value.match(/\+/g).length; });

  return result;
};

const fillIn = (values, type, deep) => {
  const obj = {};

  values.forEach((value) => {
    if (deep) {
      value[type].forEach((skill) => {
        obj[skill] += '+';
      });
    } else {
      obj[value[type]] += '+';
    }
  });

  return obj;
};

export const selectAllQuestions = state => state.questions;
export const selectAllAuthors = createSelector(selectAllQuestions, questions => entries(fillIn(questions, 'author')));
export const selectAllTypes = createSelector(selectAllQuestions, questions => entries(fillIn(questions, 'theory')));
export const selectAllSkills = createSelector(selectAllQuestions, questions => entries(fillIn(questions, 'skill', true)));
export const selectAllLevels = createSelector(selectAllQuestions, questions => entries(fillIn(questions, 'level', true)));
