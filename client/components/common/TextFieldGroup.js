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
  checkUserExists }) => (
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
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func
};

TextFieldGroup.defaultProps = {
  type: 'text',
  error: null,
  checkUserExists: () => { }
};

export default TextFieldGroup;
