import React, { Component } from 'react';
import { Link } from 'react-router';

class InterviewQuestions extends Component {
  render() {
    return (
      <div>
        <h1>Interview questions</h1>
        <p>Please go to <Link to="/questions">questions page</Link> or choose one from your list.</p>
      </div>
    );
  }
}

export default InterviewQuestions;
