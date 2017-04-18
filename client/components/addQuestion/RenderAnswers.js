import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import renderTextareaField from '../common/renderTextareaField';

const RenderAnswers = ({ fields, meta: { touched, error, submitFailed } }) => (
  <div>
    {(touched || submitFailed) && error && <span>{error}</span>}

    {fields.map((answer, index) =>
      <div className="form-group row" key={answer.toString()}>
        <div className="col-xs-10">
          <Field
            label={`Additional answer ${index + 2}`}
            name={`${answer}.text`}
            component={renderTextareaField}
            placeholder="Add more answers"
          />
        </div>

        <div className="col-xs-2">
          <div className="form-group">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => fields.remove(index)}
              style={{ marginTop: 24 }}
            >
              &times;
          </button>
          </div>
        </div>
      </div>
    )}

    <div className="form-group">
      <button
        type="button"
        className="btn btn-default"
        onClick={() => fields.push({})}
      >
          Add Answer
      </button>
    </div>
  </div>
);

RenderAnswers.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default RenderAnswers;
