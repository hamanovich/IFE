import { ADD_QUESTIONS, QUESTION_GOT } from '../actions/types';

const initialState = {
  questions: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };

    case QUESTION_GOT:
      const index = state.questions.findIndex(q => q._id === action.question._id);
      if (index > -1) {
        return state.questions.map((q) => {
          if (q._id === action.question._id) {
            return { questions: action.question };
          }
          return { questions: q };
        });
      }

      return { questions: [action.question] };

    default:
      return state;
  }
};
