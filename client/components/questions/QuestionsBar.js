import React from 'react';
import PropTypes from 'prop-types';

import QuestionsBarItem from './QuestionsBarItem';

const QuestionsBar = ({ active, filter, skills }) => (
  <aside>
    <QuestionsBarItem
      skills={skills}
      active={active}
      filter={filter}
    />
  </aside>
);

QuestionsBar.propTypes = {
  active: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
  skills: PropTypes.array.isRequired
};

export default QuestionsBar;
