import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddQuestionForm from './AddQuestionForm';
import { addQuestion, updateQuestion } from '../../actions/questionActions';

class AddQuestionPage extends Component {
  submit = (values) => {
    if (values._id) {
      this.props.updateQuestion({
        ...values,
        username: this.props.username
      });
    } else {
      this.props.addQuestion({
        ...values,
        username: this.props.username
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <AddQuestionForm {...this.props} onSubmit={this.submit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.user.username
});


AddQuestionPage.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  username: PropTypes.string
};

AddQuestionPage.defaultProps = {
  username: 'Anonim'
};

export default connect(mapStateToProps, { addQuestion, updateQuestion })(AddQuestionPage);
