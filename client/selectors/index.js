import { createSelector } from 'reselect';

export const selectAllQuestions = state => state.questions;

export const selectAllAuthors = createSelector(selectAllQuestions, (questions) => {
  const authors = {};
  questions.forEach((question) => {
    authors[question.author] += '+';
  });

  return authors;
});

export const selectAllTypes = createSelector(selectAllQuestions, (questions) => {
  const types = {};
  questions.forEach((question) => {
    types[question.theory] += '+';
  });

  return types;
});

export const selectAllSkills = createSelector(selectAllQuestions, (questions) => {
  const skills = {};

  questions.forEach((question) => {
    question.skill.forEach((skill) => {
      skills[skill] += '+';
    });
  });

  return skills;
});

export const selectAllLevels = createSelector(selectAllQuestions, (questions) => {
  const levels = {};

  questions.forEach((question) => {
    question.level.forEach((level) => {
      levels[level] += '+';
    });
  });

  return levels;
});
