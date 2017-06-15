import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { selectUser } from '../../selectors';
import AddQuestionForm from './AddQuestionForm';
import { addQuestion, updateQuestion, getQuestion } from '../../actions/questionActions';
import { addFlashMessage } from '../../actions/flashMessages';

class AddQuestionPage extends Component {
  static propTypes = {
    addQuestion: PropTypes.func.isRequired,
    updateQuestion: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getQuestion: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    userId: PropTypes.string
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    userId: ''
  };

  componentDidMount = () => {
    const { params, getQuestion } = this.props;

    if (params._id) {
      getQuestion(params._id);
    }
  };

  submit = (values) => {
    const { userId, addQuestion, updateQuestion, addFlashMessage } = this.props;
    const query = { ...values, userId, lastModified: new Date() };

    if (values._id) {
      updateQuestion(query)
        .then(() => addFlashMessage({
          type: 'success',
          text: 'Question updated successfully.'
        }));
    } else {
      addQuestion(query)
        .then(() => addFlashMessage({
          type: 'success',
          text: 'New question created successfully.'
        }));
    }

    this.context.router.push('/questions');
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
  userId: selectUser(state)._id
});


export default connect(mapStateToProps, { getQuestion, addQuestion, updateQuestion, addFlashMessage })(AddQuestionPage);
