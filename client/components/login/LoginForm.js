import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        () => this.context.router.push('/'),
        err => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  };

  render() {
    const { identifier, password, errors, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          error={errors.identifier}
          field="identifier"
          label="Username / Email"
          onChange={this.onChange}
          htmlFor="identifier"
          value={identifier}
          placeholder="Type your Username or Email"
        />

        <TextFieldGroup
          error={errors.password}
          field="password"
          label="Password"
          onChange={this.onChange}
          htmlFor="password"
          value={password}
          placeholder="Type your Password"
          type="password"
        />

        <div className="form-group">
          <button disabled={isLoading} type="submit" className="btn btn-primary btn-lg">
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginForm;
