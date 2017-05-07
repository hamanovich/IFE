import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import AddQuestionForm from './AddQuestionForm';
import { addQuestion, updateQuestion } from '../../actions/questionActions';

class AddQuestionPage extends Component {
  submit = (values) => {
    const { username, addQuestion, updateQuestion } = this.props;
    const query = { ...values, username };

    if (values._id) {
      updateQuestion(query);
    } else {
      addQuestion(query);
    }
  }

  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <AddQuestionForm {...this.props} onSubmit={this.submit} />
        </Col>
      </Row>
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
