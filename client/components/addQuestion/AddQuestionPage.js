import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddQuestionForm from './AddQuestionForm';
import { addQuestionRequest } from '../../actions/questionActions';

class AddQuestionPage extends Component {
  submit = (values) => {
    this.props.addQuestionRequest({
      ...values,
      username: this.props.username
    });
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

const mapStateToProps = state => ({
  username: state.auth.user.username
});


AddQuestionPage.propTypes = {
  addQuestionRequest: PropTypes.func.isRequired,
  username: PropTypes.string
};

AddQuestionPage.defaultProps = {
  username: 'Anonim'
};

export default connect(mapStateToProps, { addQuestionRequest })(AddQuestionPage);
