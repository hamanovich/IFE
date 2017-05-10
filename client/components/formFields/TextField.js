import React from 'react';
import PropTypes from 'prop-types';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

const TextField = ({
  input,
  label,
  placeholder,
  type,
  checkUserExists,
  errorState,
  readonly,
  meta: { touched, error, warning }
}) => (
  <FormGroup
    controlId={`label-${input.name}`}
    validationState={(touched && error) || errorState ? 'error' :
      touched && !error && !errorState ? 'success' : null}
  >
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      {...input}
      placeholder={placeholder}
      id={`label-${input.name}`}
      type={type}
      readOnly={readonly}
      onBlur={(e) => { checkUserExists(e); input.onBlur(e); }}
    />
    {errorState && <HelpBlock>{errorState}</HelpBlock>}
    {touched &&
      ((error && <HelpBlock>{error}</HelpBlock>) ||
        (warning && <span>{warning}</span>))}
  </FormGroup>
);

TextField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  readonly: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  errorState: PropTypes.string,
  checkUserExists: PropTypes.func,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  }).isRequired
};

TextField.defaultProps = {
  checkUserExists: () => { },
  errorState: null,
  readonly: false
};

export default TextField;
