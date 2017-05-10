import React from 'react';
import PropTypes from 'prop-types';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';

const SelectField = ({
  id,
  input,
  multiple,
  options,
  meta: { touched, error, warning }
}) => (
  <FormGroup
    validationState={touched && error ? 'error' :
      touched && !error ? 'success' : null}
  >
    <select
      {...input}
      id={id}
      multiple={multiple}
      className="form-control"
    >
      {options.map(o =>
        <option value={o.value} key={o.value}>{o.title}</option>
      )}
    </select>
    {touched &&
      ((error && <HelpBlock>{error}</HelpBlock>) ||
        (warning && <span>{warning}</span>))}
  </FormGroup>
);

SelectField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  id: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired
};

export default SelectField;
