import React from 'react';
import PropTypes from 'prop-types';

import QuestionsBarItem from './QuestionsBarItem';

const QuestionsBar = ({ active, filter, selector }) => (
  <aside>
    <QuestionsBarItem
      header="Authors"
      type={selector.authors}
      name="author"
      active={active}
      filter={filter}
    />

    <QuestionsBarItem
      header="Type"
      type={selector.types}
      name="theory"
      active={active}
      filter={filter}
    />

    <QuestionsBarItem
      header="Skill"
      type={selector.skills}
      name="skill"
      active={active}
      filter={filter}
    />

    <QuestionsBarItem
      header="Level"
      type={selector.levels}
      name="level"
      active={active}
      filter={filter}
    />
  </aside>
);

QuestionsBar.propTypes = {
  active: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
  selector: PropTypes.object.isRequired
};

export default QuestionsBar;
