import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const renderTextField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => (
  <div className={classnames('form-group', { 'has-error': touched && error, 'has-success': touched && !error })}>
    <label htmlFor={`label-${input.name}`}>{label}</label>
    <input
      {...input}
      placeholder={placeholder}
      id={`label-${input.name}`}
      type={type}
      className="form-control"
    />
    {touched &&
      ((error && <span className="help-block">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

renderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export default renderTextField;
