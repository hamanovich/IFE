import React from 'react';
import PropTypes from 'prop-types';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';

const RadioButton = ({
  input,
  options,
  meta: { touched, error, warning }
}) => (
  <FormGroup
    validationState={touched && error ? 'error' :
      touched && !error ? 'success' : null}
  >
    {options.map(o =>
      <Radio
        {...input}
        id={o.value}
        key={o.value}
        value={o.value}
        checked={input.value === o.value}
      >
        {o.title}
      </Radio>
    )}
    {touched &&
      ((error && <HelpBlock>{error}</HelpBlock>) ||
        (warning && <span>{warning}</span>))}
  </FormGroup>
);

RadioButton.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  options: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired
};

export default RadioButton;
