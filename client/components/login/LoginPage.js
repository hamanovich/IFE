import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import validate from '../../../server/validations/login';
import { login } from '../../actions/authActions';
import LoginForm from './LoginForm';

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    identifier: '',
    password: '',
    errors: {},
    isLoading: false
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isValid = () => {
    const errors = validate(this.state);

    if (!errors.isValid) this.setState({ errors });

    return errors.isValid;
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        () => this.context.router.push('/'),
        err => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  };

  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <LoginForm state={this.state} handleSubmit={this.onSubmit} handleChange={this.onChange} />
        </Col>
      </Row>
    );
  }
}

export default connect(null, { login })(LoginPage);
