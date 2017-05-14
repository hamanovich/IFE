import { VOTE_LIKE } from '../actions/types';

const initialState = {
  votes: {
    like: [],
    dislike: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VOTE_LIKE:
      console.log('LIKE', action.vote);
      return {
        votes: {
          ...state.votes,
          like: [
            ...state.votes.like,
            action.vote
          ]
        }
      };

    default:
      return state;
  }
};
