import axios from 'axios';
import { CANDIDATE_ADDED, CANDIDATE_GOT, CANDIDATES_GOT } from './types';

export const candidateAdded = candidate => ({
  type: CANDIDATE_ADDED,
  candidate
});

export const getCandidateById = _id => ({
  type: CANDIDATE_GOT,
  _id
});

export const candidatesGot = candidates => ({
  type: CANDIDATES_GOT,
  candidates
});

export const candidateAddRequest = data =>
  dispatch => axios.post('/api/interview', data)
    .then(res => dispatch(candidateAdded(res.data)));

export const getCandidates = () =>
  dispatch => axios.get('/api/interview')
    .then(res => dispatch(candidatesGot(res.data.candidates)));
