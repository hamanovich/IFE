import map from 'lodash/map';

import {
  ADD_QUESTIONS,
  QUESTION_ADDED,
  QUESTION_UPDATED,
  FILTER_QUESTIONS,
  QUESTION_GOT,
  REMOVE_QUESTION,
  EDIT_QUESTION,
  VOTE_LIKE,
  VOTE_DISLIKE
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_QUESTIONS:
      return action.questions;

    case QUESTION_ADDED:
      return [...state, action.question];

    case FILTER_QUESTIONS:
      const splitted = action.filter.split(':');
      const type = splitted[0];
      const value = splitted[1];
      const filtered = map(state, question => ({
        ...question,
        visible: question[type] === value || question[type].indexOf(value) > -1
      }));

      return filtered;

    case QUESTION_GOT:
      const gotIndex = state.findIndex(question => question._id === action.question._id);

      if (gotIndex > -1) {
        return map(state, (question) => {
          if (question._id === action.question._id) {
            return action.question;
          }

          return question;
        });
      }

      return [action.question];

    case REMOVE_QUESTION:
      const removeIndex = state.findIndex(question => question._id === action.question._id);

      if (removeIndex > -1) {
        return [
          ...state.slice(0, removeIndex),
          ...state.slice(removeIndex + 1)
        ];
      }

      return state;

    case EDIT_QUESTION:
    case QUESTION_UPDATED:
    case VOTE_LIKE:
    case VOTE_DISLIKE:
      const editIndex = state.findIndex(question => question._id === action.question._id);

      if (editIndex > -1) {
        return map(state, (question) => {
          if (question._id === action.question._id) {
            return action.question;
          }

          return question;
        });
      }

      return [action.question];

    default:
      return state;
  }
};
