import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import validate from '../../../server/validations/login';
import TextField from '../formFields/TextField';

const LoginForm = ({ state, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit} noValidate>
    <h1>Authorize</h1>

    {state.errors.form && <Alert bsStyle="danger">{state.errors.form}</Alert>}

    <Field
      label="Username / Email*:"
      component={TextField}
      type="text"
      htmlFor="identifier"
      name="identifier"
      placeholder="Type your Username or Email"
      onChange={handleChange}
      defaultValue={state.identifier}
      errorState={state.errors.identifier}
    />

    <Field
      label="Password*:"
      component={TextField}
      type="password"
      htmlFor="password"
      name="password"
      placeholder="Type your Password"
      onChange={handleChange}
      defaultValue={state.password}
      errorState={state.errors.password}
    />

    <FormGroup>
      <Button
        disabled={state.isLoading}
        type="submit"
        bsStyle="info"
        bsSize="large"
      >Login</Button>
    </FormGroup>
  </Form>
);

LoginForm.propTypes = {
  state: PropTypes.shape({
    identifier: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default reduxForm({ form: 'login', validate })(LoginForm);
