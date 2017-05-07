import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import SignupForm from './SignupForm';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends Component {
  render() {
    const { userSignupRequest, addFlashMessage, isUserExists } = this.props;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <SignupForm
            userSignupRequest={userSignupRequest}
            isUserExists={isUserExists}
            addFlashMessage={addFlashMessage}
          />
        </Col>
      </Row>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, isUserExists, addFlashMessage })(SignupPage);
