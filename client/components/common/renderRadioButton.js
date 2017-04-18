import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const renderRadioButton = ({
  input,
  options,
  meta: { touched, error, warning }
}) => (
  <div className={classnames('form-group', { 'has-error': touched && error, 'has-success': touched && !error })}>
    {options.map(o =>
      <div className="radio" key={o.value}>
        <label htmlFor={o.value}>
          <input
            type="radio"
            {...input}
            id={o.value}
            value={o.value}
            checked={o.value === input.value}
          />
          {o.title}
        </label>
      </div>
    )}
    {touched &&
      ((error && <span className="help-block">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

renderRadioButton.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired
};

export default renderRadioButton;
