import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Media from 'react-bootstrap/lib/Media';
import Well from 'react-bootstrap/lib/Well';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import validate from '../../../server/shared/validations/signup';
import renderRangeField from '../common/renderRangeField';
import renderTextField from '../common/renderTextField';
import renderTextareaField from '../common/renderTextareaField';

class SignupForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {},
    isLoading: false,
    invalid: false,
    avatar: {
      image: '/images/noImg.jpg',
      scale: '1',
      border: 0,
      width: 100,
      height: 100,
      img: null,
      rect: null
    }
  };

  handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({ avatar: { ...this.state.avatar, scale } });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const img = this.ava.getImageScaledToCanvas().toDataURL();
    const rect = this.ava.getCroppingRect();

    if (this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true,
        avatar: {
          ...this.state.avatar,
          img,
          rect
        }
      }, () => {
        this.props.userSignupRequest(this.state).then(
          () => {
            this.props.addFlashMessage({
              type: 'success',
              text: 'You have signed up successfully'
            });
            this.context.router.push('/');
          },
          err => this.setState({ errors: err.response.data, isLoading: false })
        );
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
    const field = e.target.name;
    const val = e.target.value;

    if (val !== '') {
      this.props.isUserExists(val).then((res) => {
        const errors = this.state.errors;
        let invalid;

        if (res.data.user.length) {
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
    const { errors, username, email, primary_skill, job_function, notes, isLoading, invalid, avatar } = this.state;

    return (
      <Form onSubmit={this.onSubmit} noValidate>
        <h1>Register</h1>
        <Well>
          <Media>
            <Media.Left>
              <AvatarEditor
                image={avatar.image}
                width={avatar.width}
                height={avatar.height}
                border={avatar.border}
                scale={Number(avatar.scale)}
                crossOrigin="anonymous"
                ref={(ava) => { this.ava = ava; }}
                style={{ cursor: 'move' }}
              />
            </Media.Left>
            <Media.Body>
              <Field
                label="Drag and drop image, then zoom:"
                component={renderRangeField}
                name="zoom"
                onChange={this.handleScale}
                min="1"
                max="3"
                step="0.01"
                defaultValue={avatar.scale.toString()}
              />
            </Media.Body>
          </Media>
        </Well>

        <Field
          label="Username*:"
          component={renderTextField}
          type="text"
          name="username"
          placeholder="Type your name"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          defaultValue={username}
          errorState={errors.username}
        />

        <Field
          label="Email*:"
          component={renderTextField}
          type="email"
          name="email"
          placeholder="Type your email"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          defaultValue={email}
          errorState={errors.email}
        />

        <Row>
          <Col sm={6}>
            <Field
              label="Primary skill:"
              component={renderTextField}
              type="text"
              name="primary_skill"
              placeholder="Type your primary skill"
              onChange={this.onChange}
              defaultValue={primary_skill}
            />
          </Col>
          <Col sm={6}>
            <Field
              label="Job function:"
              component={renderTextField}
              type="text"
              name="job_function"
              placeholder="Type your job function (level)"
              onChange={this.onChange}
              defaultValue={job_function}
            />
          </Col>
        </Row>

        <Field
          label="Notes:"
          component={renderTextareaField}
          name="notes"
          placeholder="Please add some notes about yourself"
          onChange={this.onChange}
          defaultValue={notes}
          rows={5}
        />

        <Field
          label="Password*:"
          component={renderTextField}
          type="password"
          name="password"
          placeholder="Come up with a password"
          onChange={this.onChange}
          errorState={errors.password}
        />

        <Field
          label="Confirm your Password*:"
          component={renderTextField}
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
          >Sign Up</Button>
        </FormGroup>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'signUp',
  validate
})(SignupForm);
