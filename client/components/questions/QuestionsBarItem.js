import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Badge from 'react-bootstrap/lib/Badge';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const QuestionsBarItem = ({ header, type, name, active, filter }) => (
  <ListGroup>
    <ListGroupItem header={`${header}:`} />
    {map(type, (count, val) =>
      <ListGroupItem active={active === `${name}:${val}`} onClick={() => filter(`${name}:${val}`)} key={val}>
        {val} <Badge>{count}</Badge>
      </ListGroupItem>
    )}
  </ListGroup>
);

QuestionsBarItem.propTypes = {
  header: PropTypes.string.isRequired,
  type: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired
};

export default QuestionsBarItem;
