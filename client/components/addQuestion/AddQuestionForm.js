import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';

import RenderAnswers from './RenderAnswers';
import renderTextField from '../common/renderTextField';
import renderTextareaField from '../common/renderTextareaField';
import renderRadioButton from '../common/renderRadioButton';
import validate from '../../../server/shared/validations/question';

const AddQuestionForm = (props) => {
  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new Question</h1>
      <Field
        label="Question*:"
        component={renderTextField}
        type="text"
        name="question"
        placeholder="Type new question"
      />

      <div className="row">
        <div className="form-group col-sm-6">
          <label htmlFor="section">Choose type* (multiple):</label>
          <Field
            name="section"
            component="select"
            className="form-control"
            id="section"
            type="select-multiple"
            multiple
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JS</option>
            <option value="soft">Soft</option>
          </Field>
        </div>

        <div className="form-group col-sm-6">
          <label htmlFor="level">Choose level* (multiple):</label>
          <Field
            name="level"
            component="select"
            id="level"
            className="form-control"
            type="select-multiple"
            multiple
          >
            <option value="junior">Junior</option>
            <option value="middle">Middle</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
            <option value="chief">Chief</option>
          </Field>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="theory-practice">Choose type of question*:</label>
        <Field
          component={renderRadioButton}
          name="theory"
          required
          options={[
            { title: 'Theoretical', value: 'theory' },
            { title: 'Practical', value: 'practice' }
          ]}
        />
      </div>

      <hr />

      <Field
        label="Answer"
        name="answer"
        component={renderTextareaField}
        placeholder="Write down the answer"
      />

      <FieldArray
        name="answers"
        component={RenderAnswers}
      />

      <hr />

      <Field
        label="Notes"
        name="notes"
        component={renderTextareaField}
        placeholder="Add some notes, if needed"
      />

      <br />

      <div className="form-group text-center">
        <button type="submit" disabled={submitting} className="btn btn-primary btn-lg">
          Add new Question
        </button>
      </div>
    </form >
  );
};

AddQuestionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'addQuestion',
  validate,
  initialValues: {
    question: '',
    answer: '',
    theory: ''
  }
})(AddQuestionForm);
