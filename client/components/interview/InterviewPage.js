import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Button from 'react-bootstrap/lib/Button';
import Well from 'react-bootstrap/lib/Well';

class InterviewPage extends Component {
  render() {
    return (
      <div>
        <h1>Interview journey</h1>
        <p>Press the button bellow to start interview process.</p>
        <Well>
          <LinkContainer to="/interview/step-1">
            <Button bsStyle="success" bsSize="large" block>Let&apos;s get started</Button>
          </LinkContainer>
        </Well>
      </div>
    );
  }
}

export default InterviewPage;
