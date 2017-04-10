import React, { Component } from 'react';

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  }
  
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} noValidate>
        <h1>Join our community!</h1>

        <div className="form-group">
          <label
            htmlFor="username"
            className="control-label">Username</label>
          <input
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
            id="username"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label
            htmlFor="email"
            className="control-label">Email</label>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type="email"
            name="email"
            id="email"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label
            htmlFor="password"
            className="control-label">Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            id="password"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label
            htmlFor="passwordConfirmation"
            className="control-label">Password Confirmation</label>
          <input
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  };
};

export default SignupForm;