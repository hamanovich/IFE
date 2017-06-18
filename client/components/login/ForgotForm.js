import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import validate from '../../../server/validations/forgot';
import TextField from '../formFields/TextField';

const ForgotForm = ({ state, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit} noValidate>
    <h2>I forgot my password</h2>

    {state.emailed && <Alert bsStyle="success">{state.emailed}</Alert>}

    <Field
      label="Email:"
      component={TextField}
      type="email"
      htmlFor="forgot"
      name="forgot"
      placeholder="Put Email"
      onChange={handleChange}
      defaultValue={state.forgot}
      errorState={state.errors.forgot}
    />

    <FormGroup>
      <Button
        type="submit"
        bsStyle="warning"
      >Send a reset</Button>
    </FormGroup>
  </Form>
);

ForgotForm.propTypes = {
  state: PropTypes.shape({
    forgot: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default reduxForm({ form: 'forgot', validate })(ForgotForm);
