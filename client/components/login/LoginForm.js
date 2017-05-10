import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import validate from '../../../server/validations/login';
import TextField from '../formFields/TextField';

class LoginForm extends Component {
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

    if (!errors.isValid) {
      this.setState({ errors });
    }

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
    const { identifier, password, errors, isLoading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} noValidate>
        <h1>Authorize</h1>

        {errors.form && <Alert bsStyle="danger">{errors.form}</Alert>}

        <Field
          label="Username / Email*:"
          component={TextField}
          type="text"
          htmlFor="identifier"
          name="identifier"
          placeholder="Type your Username or Email"
          onChange={this.onChange}
          defaultValue={identifier}
        />

        <Field
          label="Password*:"
          component={TextField}
          type="password"
          htmlFor="password"
          name="password"
          placeholder="Type your Password"
          onChange={this.onChange}
          defaultValue={password}
        />

        <FormGroup>
          <Button
            disabled={isLoading}
            type="submit"
            bsStyle="info"
            bsSize="large"
          >Login</Button>
        </FormGroup>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'login',
  validate
})(LoginForm);
