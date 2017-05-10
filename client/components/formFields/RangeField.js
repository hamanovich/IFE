import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

const RangeField = ({
  input,
  label,
  min,
  max,
  step,
  defaultValue
}) => (
  <FormGroup controlId={`label-${input.name}`}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      {...input}
      id={`label-${input.name}`}
      type="range"
      min={min}
      max={max}
      step={step}
      value={defaultValue}
    />
  </FormGroup>
);

RangeField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.string,
  max: PropTypes.string,
  step: PropTypes.string,
  defaultValue: PropTypes.string
};

RangeField.defaultProps = {
  checkUserExists: () => { },
  min: null,
  max: null,
  step: null,
  defaultValue: '1'
};

export default RangeField;
