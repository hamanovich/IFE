import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Well from 'react-bootstrap/lib/Well';

import validateLogin from '../../../server/validations/login';
import validateForgot from '../../../server/validations/forgot';
import { login, forgot } from '../../actions/authActions';
import LoginForm from './LoginForm';
import ForgotForm from './ForgotForm';

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    forgot: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    identifier: '',
    password: '',
    forgot: '',
    errorsLogin: {},
    errorsForgot: {},
    emailed: '',
    isLoading: false,
    openForgotForm: false
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginSubmit = (e) => {
    e.preventDefault();

    const errors = validateLogin(this.state);

    if (errors.isValid) {
      this.setState({ errorsLogin: {}, isLoading: true });
      this.props.login(this.state).then(
        () => this.context.router.push('/'),
        err => this.setState({ errorsLogin: err.response.data.errors, isLoading: false })
      );
    } else {
      this.setState({ errorsLogin: errors });
    }
  };

  onForgotSubmit = (e) => {
    e.preventDefault();

    const errors = validateForgot(this.state);

    if (errors.isValid) {
      this.props.forgot({ email: this.state.forgot }).then(
        res => this.setState({ emailed: res.emailed, errorsForgot: {} }),
        err => this.setState({ errorsForgot: err.response.data.errors })
      );
    } else {
      this.setState({ errorsForgot: errors });
    }
  };

  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <LoginForm state={this.state} handleSubmit={this.onLoginSubmit} handleChange={this.onChange} />
          <hr />
          <Well>
            <p>
              <Button bsStyle="danger" onClick={() => this.setState({ openForgotForm: !this.state.openForgotForm })}>
                Forgot password?
              </Button>
            </p>
            <Panel collapsible expanded={this.state.openForgotForm}>
              <ForgotForm state={this.state} handleSubmit={this.onForgotSubmit} handleChange={this.onChange} />
            </Panel>
          </Well>
        </Col>
      </Row>
    );
  }
}

export default connect(null, { login, forgot })(LoginPage);
