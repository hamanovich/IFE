import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/login';

import LoginForm from './LoginForm';

class LoginPage extends Component {
  render() {
    const { login } = this.props;

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <LoginForm login={login} />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
