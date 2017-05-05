import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';

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
          <h1>Account: {user.username || 'Anonim'}</h1>
          <h3>Email: {user.email}</h3>
          <p>Img:
            <img src={user.avatar_image} alt="" />
          </p>
        </Col>
      </Row>
    );
  }
}

AccountPage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    avatar_image: PropTypes.string
  }).isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(AccountPage);
