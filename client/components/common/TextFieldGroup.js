import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, htmlFor, placeholder, error, type, onChange }) => (
  <div className={classnames('form-group', { 'has-error': error })}>
    <label htmlFor={htmlFor} className="control-label">{label}</label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      name={field}
      id={htmlFor}
      className="form-control"
      placeholder={placeholder}
    />
    {error && <span className="help-block">{error}</span>}
  </div>
);

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: 'text',
  error: null
};

export default TextFieldGroup;
