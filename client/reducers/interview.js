
import { CANDIDATE_ADDED, CANDIDATE_GOT, CANDIDATES_GOT } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case CANDIDATE_ADDED:
      console.log(action);
      return [...state, action.candidate];

    case CANDIDATE_GOT:
      console.log(action);
      console.log(state, typeof state);
      const candidateIndex = state.findIndex(candidate => candidate._id === action._id);

      if (candidateIndex > -1) {
        return state[candidateIndex];
      }

      return state;

    case CANDIDATES_GOT:
      console.log(action);
      return action.candidates;
    default:
      return state;
  }
};
