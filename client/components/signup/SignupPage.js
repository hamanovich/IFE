import React, { Component } from 'react';

import SignupForm from './SignupForm';

class SignupPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <SignupForm />
        </div>
      </div>
    );
  };
};

export default SignupPage;