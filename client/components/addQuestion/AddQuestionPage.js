import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddQuestionForm from './AddQuestionForm';
import { addQuestionRequest } from '../../actions/questionActions';

class AddQuestionPage extends Component {
  submit = (values) => {
    console.log(values);

    this.props.addQuestionRequest(values).then(
      () => {
        console.log('VLVVLVLVL', values);
      }
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <AddQuestionForm onSubmit={this.submit} />
        </div>
      </div>
    );
  }
}


AddQuestionPage.propTypes = {
  addQuestionRequest: PropTypes.func.isRequired
};

export default connect(null, { addQuestionRequest })(AddQuestionPage);
