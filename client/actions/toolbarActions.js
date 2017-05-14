import { VOTE_LIKE, VOTE_DISLIKE } from './types';

export const voteLike = ({ vote }) => ({
  type: VOTE_LIKE,
  vote
});

export const voteDislike = () => ({
  type: VOTE_DISLIKE
});
