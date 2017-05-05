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
          <ListGroupItem header="Author:" />
          <ListGroupItem active={active === 'author:hamanovich'} onClick={() => filter('author:hamanovich')}>Hamanovich</ListGroupItem>
          <ListGroupItem active={active === 'author:admin'} onClick={() => filter('author:admin')}>Admin</ListGroupItem>
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="Type:" />
          <ListGroupItem active={active === 'theory:theory'} onClick={() => filter('theory:theory')}>Theory</ListGroupItem>
          <ListGroupItem active={active === 'theory:practice'} onClick={() => filter('theory:practice')}>Practice</ListGroupItem>
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="Section:" />
          <ListGroupItem active={active === 'section:html'} onClick={() => filter('section:html')}>HTML</ListGroupItem>
          <ListGroupItem active={active === 'section:js'} onClick={() => filter('section:js')}>JS</ListGroupItem>
          <ListGroupItem active={active === 'section:css'} onClick={() => filter('section:css')}>CSS</ListGroupItem>
          <ListGroupItem active={active === 'section:soft'} onClick={() => filter('section:soft')}>Soft</ListGroupItem>
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
