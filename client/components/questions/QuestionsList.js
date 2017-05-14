import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Loader from '../overall/Loader';
import Question from './Question';

const QuestionsList = ({ questions, user, removeQuestionById, changeQuestionField, voteQuestion }) => (
  <div>
    {map(questions, (question, index) => (
      <Question
        ans={question}
        index={index}
        remove={removeQuestionById}
        changeQuestionField={changeQuestionField}
        voteQuestion={voteQuestion}
        key={question._id}
        user={user}
      />
    ))}
  </div>
);

QuestionsList.propTypes = {
  removeQuestionById: PropTypes.func.isRequired,
  changeQuestionField: PropTypes.func.isRequired,
  voteQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired
};

export default Loader('questions')(QuestionsList);
