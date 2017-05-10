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

import { getQuestion } from '../../actions/questionActions';
import RenderAnswers from './RenderAnswers';
import TextField from '../formFields/TextField';
import TextareaField from '../formFields/TextareaField';
import RadioButton from '../formFields/RadioButton';
import SelectField from '../formFields/SelectField';
import validate from '../../../server/validations/question';

class AddQuestionForm extends Component {
  componentDidMount = () => {
    const { params, getQuestion } = this.props;

    if (params._id) {
      getQuestion(params._id);
    }
  };

  render() {
    const { handleSubmit, submitting, params } = this.props;

    return (
      <Form onSubmit={handleSubmit} noValidate>
        <h1>{params._id ? 'Update question' : 'Add new question'}</h1>
        <Field
          label="Question*:"
          component={TextField}
          type="text"
          name="question"
          placeholder="Type new question"
        />

        <Row>
          <Col sm={6}>
            <FormGroup>
              <ControlLabel>Choose skill* (multiple):</ControlLabel>
              <Field
                component={SelectField}
                name="skill"
                id="skill"
                type="select"
                multiple
                options={[
                  { title: 'HTML', value: 'HTML' },
                  { title: 'CSS', value: 'CSS' },
                  { title: 'JS', value: 'JS' },
                  { title: 'Soft', value: 'Soft' },
                  { title: 'Other', value: 'Other' }
                ]}
              />
            </FormGroup>
          </Col>

          <Col sm={6}>
            <ControlLabel>Choose level* (multiple):</ControlLabel>
            <Field
              component={SelectField}
              name="level"
              id="level"
              type="select"
              multiple
              options={[
                { title: 'Junior', value: 'Junior' },
                { title: 'Middle', value: 'Middle' },
                { title: 'Senior', value: 'Senior' },
                { title: 'Lead', value: 'Lead' },
                { title: 'Chief', value: 'Chief' }
              ]}
            />
          </Col>
        </Row>

        <FormGroup controlId="theory-practice">
          <ControlLabel>Choose type of question*:</ControlLabel>
          <Field
            component={RadioButton}
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
          component={TextareaField}
          placeholder="Write down the answer"
        />

        <FieldArray name="answers" component={RenderAnswers} />

        <hr />

        <Field
          label="Notes"
          name="notes"
          component={TextareaField}
          placeholder="Add some notes, if needed"
        />

        <FormGroup>
          <Button
            disabled={submitting}
            type="submit"
            bsStyle="info"
            bsSize="large"
          >{params._id ? 'Update question' : 'Add new question'}</Button>
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
