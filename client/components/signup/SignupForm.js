import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Media from 'react-bootstrap/lib/Media';
import Well from 'react-bootstrap/lib/Well';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import { selectUser } from '../../selectors';

import { logout } from '../../actions/authActions';
import { getUser, updateUser } from '../../actions/signupActions';
import validate from '../../../server/validations/signup';
import RangeField from '../formFields/RangeField';
import TextField from '../formFields/TextField';
import TextareaField from '../formFields/TextareaField';

class SignupForm extends Component {
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    _id: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    primary_skill: '',
    job_function: '',
    notes: '',
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

  componentDidMount = () => {
    const { params, getUser, initialValues } = this.props;
    const { _id, username, email, primary_skill, job_function, notes, avatar_image } = initialValues;

    if (params.id) {
      getUser(params.id);
      this.setState({
        _id, username, email, primary_skill, job_function, notes, avatar: { ...this.state.avatar, image: avatar_image }
      });
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
        if (this.props.params.id) {
          this.props.updateUser(this.state).then(
            () => {
              this.props.addFlashMessage({
                type: 'success',
                text: 'You have updated profile successfully. Please login again.'
              });
              this.context.router.push('/');
            },
            err => this.setState({ errors: err.response.data, isLoading: false })
          );
        } else {
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
        }

        this.props.logout();
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
    const { errors, username, email, primary_skill, job_function, notes, isLoading, invalid, avatar } = this.state;
    const { params, initialValues } = this.props;

    return (
      <Form onSubmit={this.onSubmit} noValidate>
        <h1>{params.id ? 'Edit profile' : 'Register'}</h1>
        <Well>
          <Media>
            <Media.Left>
              <AvatarEditor
                image={params.id ? initialValues.avatar_image : avatar.image}
                width={avatar.width}
                height={avatar.height}
                border={avatar.border}
                scale={Number(avatar.scale)}
                crossOrigin="anonymous"
                ref={(ava) => { this.ava = ava; }}
                style={{ cursor: 'move', border: '1px solid gray' }}
              />
            </Media.Left>
            <Media.Body>
              <Field
                label="Drag and drop image, then zoom:"
                component={RangeField}
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
          component={TextField}
          type="text"
          name="username"
          placeholder="Type your name"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          defaultValue={username}
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
          defaultValue={email}
          errorState={errors.email}
          readonly={!!params.id}
        />

        <Row>
          <Col sm={6}>
            <Field
              label="Primary skill:"
              component={TextField}
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
              component={TextField}
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
          component={TextareaField}
          name="notes"
          placeholder="Please add some notes about yourself"
          onChange={this.onChange}
          defaultValue={notes}
          rows={5}
        />

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
  if (props.params.id && typeof selectUser(state) !== 'undefined') {
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
