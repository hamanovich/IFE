import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Well from 'react-bootstrap/lib/Well';
import Modal from 'react-bootstrap/lib/Modal';

import { logout } from '../../actions/authActions';
import { removeUserById } from '../../actions/signupActions';

class AccountPage extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      job_function: PropTypes.string,
      primary_skill: PropTypes.string,
      notes: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string
    }).isRequired,
    logout: PropTypes.func.isRequired,
    removeUserById: PropTypes.func.isRequired
  };

  state = {
    showRemoveModal: false,
    _id: ''
  };

  close = () => {
    this.setState({
      showRemoveModal: false,
      _id: ''
    });
  };

  openRemoveModel = (_id) => {
    this.setState({
      showRemoveModal: true,
      _id
    });
  };

  remove = (_id) => {
    this.props.removeUserById(_id).then(
      () => this.props.logout(),
      err => console.error(err)
    );
  };

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
          <h1>{user.first_name} {user.last_name}</h1>
          <dl>
            <dt>Email:</dt>
            <dd>{user.email}</dd>
            <dt>Primary Skill:</dt>
            <dd>{user.primary_skill || 'N/a'}</dd>
            <dt>Job Function:</dt>
            <dd>{user.job_function || 'N/a'}</dd>
          </dl>
          <Well>{user.notes || 'Add some notes about yourself'}</Well>

          <hr />

          <ButtonGroup bsSize="small" className="pull-right">
            <Link to={`/user/${user._id}`} className="btn btn-warning">Edit profile</Link>
            <Button bsStyle="danger" onClick={() => this.openRemoveModel(user._id)}>Remove profile</Button>
          </ButtonGroup>

          <Modal bsSize="sm" show={this.state.showRemoveModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>If so, you will not be able to restore your private data. And you will also lost access to adding questions.</p>
            </Modal.Body>
            <Modal.Footer>
              <ButtonGroup>
                <Button
                  bsStyle="default"
                  onClick={this.close}
                >Cancel</Button>
                <Button
                  bsStyle="danger"
                  onClick={() => this.remove(this.state._id)}
                >Remove</Button>
              </ButtonGroup>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default connect(null, { logout, removeUserById })(AccountPage);
