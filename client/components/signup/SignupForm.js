import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';

import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/signup';

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
      scale: 1,
      border: 0,
      width: 200,
      height: 200,
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
        console.log(this.state.avatar.img);
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
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
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
    const {
      errors,
      username,
      email,
      password,
      passwordConfirmation,
      isLoading,
      invalid,
      avatar
    } = this.state;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <h1>Register</h1>

        <h4>Avatar (drag & drop your image):</h4>
        <AvatarEditor
          image={avatar.image}
          width={avatar.width}
          height={avatar.height}
          border={avatar.border}
          scale={avatar.scale}
          crossOrigin="anonymous"
          ref={(ava) => { this.ava = ava; }}
        />

        <TextFieldGroup
          label="Zoom"
          onChange={this.handleScale}
          htmlFor="zoom"
          field="zoom"
          type="range"
          min="1"
          max="3"
          step="0.01"
          value={avatar.scale.toString()}
        />

        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={username}
          htmlFor="username"
          placeholder="Type your name"
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={email}
          htmlFor="email"
          placeholder="Type your email"
          field="email"
          type="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={password}
          htmlFor="password"
          placeholder="Come up with a password"
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Confirm your Password"
          onChange={this.onChange}
          value={passwordConfirmation}
          htmlFor="passwordConfirmation"
          placeholder="Repeat your password"
          field="passwordConfirmation"
          type="password"
        />

        <div className="form-group">
          <button disabled={isLoading || invalid} type="submit" className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
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

export default SignupForm;
