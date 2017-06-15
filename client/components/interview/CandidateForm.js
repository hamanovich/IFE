import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import map from 'lodash/map';
import uniqueId from 'lodash/uniqueId';

import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import { selectCandidates } from '../../selectors';
import { candidateAddRequest, getCandidateById, getCandidates } from '../../actions/interviewActions';
import { addFlashMessage } from '../../actions/flashMessages';
import validate from '../../../server/validations/interview';
import TextField from '../formFields/TextField';
import TextareaField from '../formFields/TextareaField';

class CandidateForm extends Component {
  static propTypes = {
    candidateAddRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getCandidateById: PropTypes.func.isRequired,
    getCandidates: PropTypes.func.isRequired,
    candidates: PropTypes.array
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    candidates: []
  };

  state = {
    email: '',
    first_name: '',
    last_name: '',
    job_function: '',
    primary_skill: '',
    notes: '',
    errors: {},
    isLoading: false,
    invalid: false,
    panelOpen: false,
    candidatesLoaded: false
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { addFlashMessage, candidateAddRequest } = this.props;

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      candidateAddRequest(this.state).then(
        () => {
          addFlashMessage({
            type: 'success',
            text: 'You have added candidate successfully'
          });
          this.context.router.push('/interview/step-2');
        },
        err => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  };

  chooseOne = () => {
    this.props.getCandidateById(this.candidateOne.value);
    this.context.router.push('/interview/step-2');
  };

  isValid = () => {
    const errors = validate(this.state);

    if (!errors.isValid) {
      this.setState({ errors });
    }

    return errors.isValid;
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  chooseFromList = () => {
    this.setState({ panelOpen: !this.state.panelOpen });
    if (!this.state.panelOpen && !this.state.candidatesLoaded) {
      this.props.getCandidates().then(
        () => this.setState({ candidatesLoaded: true }),
        err => this.setState({ errors: err.response })
      );
    }
  };

  render() {
    const { errors, email, isLoading, invalid, first_name, last_name, job_function, primary_skill, notes } = this.state;
    const { candidates } = this.props;
    const chooseCandidates = map(candidates, int =>
      <option
        value={int._id}
        key={uniqueId()}
      >{int.first_name} {int.last_name} - {int.primary_skill} ({int.job_function})</option>);


    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <Form onSubmit={this.onSubmit} noValidate>
            <h1>Add new Candidate</h1>
            <p><Button bsSize="small" onClick={this.chooseFromList}>
              or choose one from the list
            </Button></p>

            {chooseCandidates && <Panel collapsible expanded={this.state.panelOpen}>
              <FormGroup>
                <ControlLabel>Choose candidate from the list below:</ControlLabel>
                <Field
                  name="candidates"
                  id="candidates"
                  component="select"
                  className="form-control"
                  ref={(ref) => { this.candidateOne = ref; }}
                >
                  <option value="">Select a candidate...</option>
                  {chooseCandidates}
                </Field>
              </FormGroup>
              <Button bsSize="small" bsStyle="success" onClick={this.chooseOne}>Choose</Button>
            </Panel>
            }

            <Row>
              <Col sm={6}>
                <Field
                  label="First name:"
                  component={TextField}
                  type="text"
                  name="first_name"
                  placeholder="Type name"
                  onChange={this.onChange}
                  defaultValue={first_name}
                />
              </Col>
              <Col sm={6}>
                <Field
                  label="Last name:"
                  component={TextField}
                  type="text"
                  name="last_name"
                  placeholder="Type surname"
                  onChange={this.onChange}
                  defaultValue={last_name}
                />
              </Col>
            </Row>

            <Field
              label="Email*:"
              component={TextField}
              type="email"
              name="email"
              placeholder="Type email"
              onChange={this.onChange}
              checkUserExists={this.checkUserExists}
              defaultValue={email}
              errorState={errors.email}
            />

            <hr />

            <Row>
              <Col sm={6}>
                <Field
                  label="Primary skill:"
                  component={TextField}
                  type="text"
                  name="primary_skill"
                  placeholder="Type primary skill"
                  onChange={this.onChange}
                  defaultValue={primary_skill}
                />
              </Col>
              <Col sm={6}>
                <Field
                  label="Job function:"
                  component={TextField}
                  type="text"
                  name="job_function"
                  placeholder="Type job function (level)"
                  onChange={this.onChange}
                  defaultValue={job_function}
                />
              </Col>
            </Row>

            <Field
              label="Notes:"
              component={TextareaField}
              name="notes"
              placeholder="Please add some notes about candidate"
              onChange={this.onChange}
              defaultValue={notes}
              rows={5}
            />

            <FormGroup>
              <Button
                disabled={isLoading || invalid}
                type="submit"
                bsStyle="info"
                bsSize="large"
              >Proceed interview</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  candidates: selectCandidates(state)
});

export default connect(mapStateToProps, { addFlashMessage, candidateAddRequest, getCandidateById, getCandidates })(reduxForm({
  form: 'candidateForm',
  validate
})(CandidateForm));
