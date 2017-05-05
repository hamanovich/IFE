import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { login } from '../../actions/authActions';
import LoginForm from './LoginForm';

class LoginPage extends Component {
  render() {
    const { login } = this.props;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <LoginForm login={login} />
        </Col>
      </Row>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
