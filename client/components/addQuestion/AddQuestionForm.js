import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import { getQuestion } from '../../actions/answerActions';
import RenderAnswers from './RenderAnswers';
import renderTextField from '../common/renderTextField';
import renderTextareaField from '../common/renderTextareaField';
import renderRadioButton from '../common/renderRadioButton';
import validate from '../../../server/shared/validations/question';

class AddQuestionForm extends Component {
  componentDidMount = () => {
    const { params, getQuestion } = this.props;

    if (params._id) {
      getQuestion(params._id);
    }
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit} noValidate>
        <h1>{this.props.params._id ? 'Update question' : 'Add new question'}</h1>
        <Field
          label="Question*:"
          component={renderTextField}
          type="text"
          name="question"
          placeholder="Type new question"
        />

        <Row>
          <Col sm={6}>
            <FormGroup>
              <label htmlFor="skill">Choose skill* (multiple):</label>
              <Field
                name="skill"
                component="select"
                className="form-control"
                id="skill"
                type="select-multiple"
                multiple
              >
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JS">JS</option>
                <option value="Soft">Soft</option>
              </Field>
            </FormGroup>
          </Col>

          <Col sm={6}>
            <FormGroup>
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
            </FormGroup>
          </Col>
        </Row>

        <FormGroup controlId="theory-practice">
          <ControlLabel>Choose type of question*:</ControlLabel>
          <Field
            component={renderRadioButton}
            name="theory"
            required
            options={[
              { title: 'Theoretical', value: 'theory' },
              { title: 'Practical', value: 'practice' }
            ]}
          />
        </FormGroup>

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

        <FormGroup>
          <Button
            disabled={submitting}
            type="submit"
            bsStyle="info"
            bsSize="large"
          >{this.props.params._id ? 'Update question' : 'Add new question'}</Button>
        </FormGroup>
      </Form>
    );
  }
}

AddQuestionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  getQuestion: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
};

AddQuestionForm.defaultProps = {
  question: null
};

function mapStateToProps(state, props) {
  if (props.params._id && typeof state.questions !== 'undefined') {
    return {
      initialValues: state.questions.find(q => q._id === props.params._id)
    };
  }

  return { initialValues: {} };
}

export default connect(mapStateToProps, { getQuestion })(
  reduxForm({
    form: 'addQuestion',
    validate
  })(AddQuestionForm));
