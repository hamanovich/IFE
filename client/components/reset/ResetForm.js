import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import validate from '../../../server/validations/forgot';
import TextField from '../formFields/TextField';

const ResetForm = ({ state, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit} noValidate>
    <h2>Reset my password</h2>

    {state.errors.reset && <Alert bsStyle="danger">{state.errors.reset}</Alert>}

    <Field
      label="Password*:"
      component={TextField}
      type="password"
      name="password"
      placeholder="Come up with a password"
      onChange={handleChange}
      defaultValue={state.password}
      errorState={state.errors.password}
    />

    <Field
      label="Confirm your Password*:"
      component={TextField}
      type="password"
      name="passwordConfirmation"
      placeholder="Repeat your password"
      onChange={handleChange}
      defaultValue={state.passwordConfirmation}
      errorState={state.errors.passwordConfirmation}
    />

    <FormGroup>
      <Button
        type="submit"
        bsStyle="warning"
      >Reset password</Button>
    </FormGroup>
  </Form>
);

ResetForm.propTypes = {
  state: PropTypes.shape({
    password: PropTypes.string.isRequired,
    passwordConfirmation: PropTypes.string.isRequired,
    errors: PropTypes.object
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default reduxForm({ form: 'reset', validate })(ResetForm);
