import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Badge from 'react-bootstrap/lib/Badge';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';

const QuestionsBarItem = ({ active, skills, filter }) => (
  <ButtonToolbar>
    {map(skills, skill =>
      <Button
        bsStyle="primary"
        key={skill._id} active={active === `${skill._id}`}
        onClick={() => filter(`${skill._id}`)}>
        {skill._id}&emsp;<Badge>{skill.count}</Badge>
      </Button>
    )}
  </ButtonToolbar>
);

QuestionsBarItem.propTypes = {
  skills: PropTypes.array.isRequired,
  active: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired
};

export default QuestionsBarItem;
