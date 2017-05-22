import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import {
  USER_GOT,
  SET_CURRENT_USER,
  QUESTION_ADDED,
  EDIT_QUESTION,
  REMOVE_QUESTION,
  FILTER_QUESTIONS,
  VOTE_LIKE,
  VOTE_DISLIKE
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_GOT:
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };

    case EDIT_QUESTION:
      const editIndex = state.user.questions.findIndex(question => question._id === action.question._id);

      if (editIndex > -1) {
        return {
          ...state,
          user: {
            ...state.user,
            questions: [
              ...state.user.questions.slice(0, editIndex),
              action.question,
              ...state.user.questions.slice(editIndex + 1)
            ]
          }
        };
      }

      return state;

    case VOTE_LIKE:
      return {
        ...state,
        user: {
          ...state.user,
          votes: {
            ...state.user.votes,
            like: [
              ...state.user.votes.like,
              action.question._id
            ]
          }
        }
      };

    case VOTE_DISLIKE:
      return {
        ...state,
        user: {
          ...state.user,
          votes: {
            ...state.user.votes,
            dislike: [
              ...state.user.votes.dislike,
              action.question._id
            ]
          }
        }
      };

    case REMOVE_QUESTION:
      const removeIndex = state.user.questions.findIndex(question => question._id === action.question._id);

      if (removeIndex > -1) {
        return {
          ...state,
          user: {
            ...state.user,
            questions: [
              ...state.user.questions.slice(0, removeIndex),
              ...state.user.questions.slice(removeIndex + 1)
            ]
          }
        };
      }

      return state;

    case FILTER_QUESTIONS:
      const splitted = action.filter.split(':');
      const type = splitted[0];
      const value = splitted[1];
      const questions = map(state.questions, question => ({
        ...question,
        visible: question[type] === value || question[type].indexOf(value) > -1 || true
      }));

      return {
        ...state,
        user: {
          ...state.user,
          questions
        }
      };

    case QUESTION_ADDED:
      return {
        ...state,
        user: {
          ...state.user,
          questions: [
            ...state.user.questions,
            action.question
          ]
        }
      };

    default:
      return state;
  }
};
