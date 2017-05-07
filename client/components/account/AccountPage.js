import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Image from 'react-bootstrap/lib/Image';
import Well from 'react-bootstrap/lib/Well';

import { logout } from '../../actions/authActions';

class AccountPage extends Component {
  render() {
    const { logout, user } = this.props;

    return (
      <Row>
        <Col md={3} sm={4}>
          <ListGroup>
            <Link to={`/questions/author:${user.username}`} className="list-group-item">Questions</Link>
            <Link to="/add-question" className="list-group-item">Add question</Link>
            <Button block bsStyle="danger" onClick={logout}>Logout</Button>
          </ListGroup>
        </Col>
        <Col md={9} sm={8}>
          <h1>Account: {user.username}</h1>
          <p>
            <Image src={user.avatar_image} alt={user.username} thumbnail />
          </p>
          <dl>
            <dt>Email:</dt>
            <dd>{user.email}</dd>
            <dt>Primary Skill:</dt>
            <dd>{user.primary_skill}</dd>
            <dt>Job Function:</dt>
            <dd>{user.job_function}</dd>
          </dl>
          <Well>
            {user.notes}
          </Well>

          <hr />
          <ButtonToolbar>
            <ButtonGroup bsSize="small" className="pull-right">
              <Button bsStyle="warning">Edit profile</Button>
              <Button bsStyle="danger">Remove profile</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }
}

AccountPage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    avatar_image: PropTypes.string,
    job_function: PropTypes.string,
    primary_skill: PropTypes.string,
    notes: PropTypes.string
  }).isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(AccountPage);
