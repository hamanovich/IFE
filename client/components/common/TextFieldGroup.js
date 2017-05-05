import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({
  field,
  value,
  label,
  htmlFor,
  placeholder,
  error,
  type,
  onChange,
  checkUserExists,
  min,
  max,
  step }) => (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label htmlFor={htmlFor} className="control-label">{label}</label>
      <input
        value={value}
        onChange={onChange}
        onBlur={checkUserExists}
        type={type}
        name={field}
        id={htmlFor}
        className="form-control"
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      />
      {error && <span className="help-block">{error}</span>}
    </div>
  );

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func,
  min: PropTypes.string,
  max: PropTypes.string,
  step: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text',
  placeholder: '',
  value: '',
  error: null,
  min: null,
  max: null,
  step: null,
  checkUserExists: () => { }
};

export default TextFieldGroup;
