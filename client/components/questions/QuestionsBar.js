import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

class QuestionsBar extends Component {
  render() {
    const { active, filter } = this.props;

    return (
      <div>
        <ListGroup>
          <ListGroupItem header="Type:" />
          <ListGroupItem active={active === 'theory:theory'} onClick={() => filter('theory:theory')}>Theory</ListGroupItem>
          <ListGroupItem active={active === 'theory:practice'} onClick={() => filter('theory:practice')}>Practice</ListGroupItem>
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="Skill:" />
          <ListGroupItem active={active === 'skill:HTML'} onClick={() => filter('skill:HTML')}>HTML</ListGroupItem>
          <ListGroupItem active={active === 'skill:JS'} onClick={() => filter('skill:JS')}>JS</ListGroupItem>
          <ListGroupItem active={active === 'skill:CSS'} onClick={() => filter('skill:CSS')}>CSS</ListGroupItem>
          <ListGroupItem active={active === 'skill:Soft'} onClick={() => filter('skill:Soft')}>Soft</ListGroupItem>
          <ListGroupItem active={active === 'skill:Other'} onClick={() => filter('skill:Other')}>Other</ListGroupItem>
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="Level:" />
          <ListGroupItem active={active === 'level:junior'} onClick={() => filter('level:junior')}>Junior</ListGroupItem>
          <ListGroupItem active={active === 'level:middle'} onClick={() => filter('level:middle')}>Middle</ListGroupItem>
          <ListGroupItem active={active === 'level:senior'} onClick={() => filter('level:senior')}>Senior</ListGroupItem>
          <ListGroupItem active={active === 'level:lead'} onClick={() => filter('level:lead')}>Lead</ListGroupItem>
          <ListGroupItem active={active === 'level:chief'} onClick={() => filter('level:chief')}>Chief</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

QuestionsBar.propTypes = {
  active: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired
};

export default QuestionsBar;
