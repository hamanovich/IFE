import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Badge from 'react-bootstrap/lib/Badge';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const QuestionsBar = ({ active, filter, authors, types, skills, levels }) => (
  <aside>
    <ListGroup>
      <ListGroupItem header="Authors:" />
      {map(authors, (count, author) =>
        <ListGroupItem active={active === `author:${author}`} onClick={() => filter(`author:${author}`)} key={author}>
          {author} <Badge>{(count.match(/\+/g) || []).length}</Badge>
        </ListGroupItem>
      )}
    </ListGroup>

    <ListGroup>
      <ListGroupItem header="Type:" />
      {map(types, (count, theory) =>
        <ListGroupItem active={active === `theory:${theory}`} onClick={() => filter(`theory:${theory}`)} key={theory}>
          {theory} <Badge>{(count.match(/\+/g) || []).length}</Badge>
        </ListGroupItem>
      )}
    </ListGroup>

    <ListGroup>
      <ListGroupItem header="Skill:" />
      {map(skills, (count, skill) =>
        <ListGroupItem active={active === `skill:${skill}`} onClick={() => filter(`skill:${skill}`)} key={skill}>
          {skill} <Badge>{(count.match(/\+/g) || []).length}</Badge>
        </ListGroupItem>
      )}
    </ListGroup>

    <ListGroup>
      <ListGroupItem header="Level:" />
      {map(levels, (count, level) =>
        <ListGroupItem active={active === `level:${level}`} onClick={() => filter(`level:${level}`)} key={level}>
          {level} <Badge>{(count.match(/\+/g) || []).length}</Badge>
        </ListGroupItem>
      )}
    </ListGroup>
  </aside>
);

QuestionsBar.propTypes = {
  active: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
  authors: PropTypes.object.isRequired,
  types: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  levels: PropTypes.object.isRequired
};

export default QuestionsBar;
