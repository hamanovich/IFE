import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import { selectUser } from '../../selectors';

import { logout } from '../../actions/authActions';
import { getUser, updateUser } from '../../actions/signupActions';
import validate from '../../../server/validations/signup';
import TextField from '../formFields/TextField';
import TextareaField from '../formFields/TextareaField';

class SignupForm extends Component {
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    errors: {},
    isLoading: false,
    invalid: false
  };

  componentDidMount = () => {
    const { params, getUser, initialize, initialValues } = this.props;

    if (params.id && !initialValues.first_name) {
      getUser(params.id)
        .then((res) => {
          const { username, email, first_name, last_name, job_function, primary_skill, notes } = res.user;
          initialize({
            username, email, first_name, last_name, job_function, primary_skill, notes
          });
        });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { params, updateUser, getUser, addFlashMessage, userSignupRequest } = this.props;

    if (this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true
      }, () => {
        if (params.id) {
          updateUser(this.state).then(
            () => {
              addFlashMessage({
                type: 'success',
                text: 'You have updated profile successfully.'
              });
              this.context.router.push('/account');
              getUser(params.id);
            },
            err => this.setState({ errors: err.response.data, isLoading: false })
          );
        } else {
          userSignupRequest(this.state).then(
            () => {
              addFlashMessage({
                type: 'success',
                text: 'You have signed up successfully'
              });
              this.context.router.push('/');
            },
            err => this.setState({ errors: err.response.data, isLoading: false })
          );
        }
      });
    }
  };

  isValid = () => {
    const errors = validate(this.state);

    if (!errors.isValid) {
      this.setState({ errors });
    }

    return errors.isValid;
  };

  checkUserExists = (e) => {
    const { params, isUserExists } = this.props;
    const field = e.target.name;
    const val = e.target.value;

    if (val !== '' && !params.id) {
      isUserExists(val).then((res) => {
        const errors = this.state.errors;
        let invalid;

        if (res.data.user) {
          errors[field] = `There is user with such ${field}`;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }

        this.setState({ errors, invalid });
      });
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, isLoading, invalid } = this.state;
    const { params } = this.props;

    return (
      <Form onSubmit={this.onSubmit} noValidate>
        <h1>{params.id ? 'Edit profile' : 'Register'}</h1>
        <Field
          label="Username*:"
          component={TextField}
          type="text"
          name="username"
          placeholder="Type your name"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          errorState={errors.username}
          readonly={!!params.id}
        />

        <Field
          label="Email*:"
          component={TextField}
          type="email"
          name="email"
          placeholder="Type your email"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          errorState={errors.email}
          readonly={!!params.id}
        />

        <Row>
          <Col sm={6}>
            <Field
              label="First name:"
              component={TextField}
              type="text"
              name="first_name"
              placeholder="What is your name"
              onChange={this.onChange}
            />
          </Col>
          
          <Col sm={6}>
            <Field
              label="Last name:"
              component={TextField}
              type="text"
              name="last_name"
              placeholder="What is your surname"
              onChange={this.onChange}
            />
          </Col>
        </Row>

        <hr />

        <Row>
          <Col sm={6}>
            <Field
              label="Primary skill:"
              component={TextField}
              type="text"
              name="primary_skill"
              placeholder="Type your primary skill"
              onChange={this.onChange}
            />
          </Col>
          <Col sm={6}>
            <Field
              label="Job function:"
              component={TextField}
              type="text"
              name="job_function"
              placeholder="Type your job function (level)"
              onChange={this.onChange}
            />
          </Col>
        </Row>

        <Field
          label="Notes:"
          component={TextareaField}
          name="notes"
          placeholder="Please add some notes about yourself"
          onChange={this.onChange}
          rows={5}
        />

        <hr />

        <Field
          label="Password*:"
          component={TextField}
          type="password"
          name="password"
          placeholder="Come up with a password"
          onChange={this.onChange}
          errorState={errors.password}
        />

        <Field
          label="Confirm your Password*:"
          component={TextField}
          type="password"
          name="passwordConfirmation"
          placeholder="Repeat your password"
          onChange={this.onChange}
          errorState={errors.passwordConfirmation}
        />

        <FormGroup>
          <Button
            disabled={isLoading || invalid}
            type="submit"
            bsStyle="info"
            bsSize="large"
          >{params.id ? 'Update profile' : 'Sign Up'}</Button>
        </FormGroup>
      </Form>
    );
  }
}

function mapStateToProps(state, props) {
  if (props.params.id) {
    return {
      initialValues: selectUser(state)
    };
  }

  return { initialValues: {} };
}

export default connect(mapStateToProps, { getUser, updateUser, logout })(reduxForm({
  form: 'signUp',
  validate
})(SignupForm));
