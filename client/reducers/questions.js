import { ADD_QUESTIONS, FILTER_QUESTIONS, QUESTION_GOT } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_QUESTIONS:
      return action.questions;

    case FILTER_QUESTIONS:
      const splitted = action.filter.split(':');
      const type = splitted[0];
      const value = splitted[1];
      const filtered = state.map(question => ({
        ...question,
        visible: question[type] === value || question[type].indexOf(value) > -1
      }));

      return filtered;

    case QUESTION_GOT:

      const index = state.findIndex(q => q._id === action.question._id);
      if (index > -1) {
        return state.map((q) => {
          if (q._id === action.question._id) {
            return action.question;
          }
          return q;
        });
      }
      return [action.question];

    default:
      return state;
  }
};
