import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const renderTextareaField = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div className={classnames('form-group', { 'has-error': touched && error, 'has-success': touched && !error })}>
    <label htmlFor={`label-${input.name}`}>{label}</label>
    <textarea
      {...input}
      placeholder={placeholder}
      id={`label-${input.name}`}
      className="form-control"
    />
    {touched &&
      ((error && <span className="help-block">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

renderTextareaField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export default renderTextareaField;
