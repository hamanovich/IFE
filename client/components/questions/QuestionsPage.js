import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import Question from './Question';
import QuestionsBar from './QuestionsBar';
import { getQuestions, filterQuestions, removeQuestionById, changeQuestionField } from '../../actions/answerActions';
import { addFlashMessage, deleteFlashMessages } from '../../actions/flashMessages';

class QuestionsPage extends Component {
  state = {
    questions: [],
    errors: {},
    active: ''
  };

  componentDidMount() {
    this.getQuestions(this.props.params.type || '');
  }

  componentWillReceiveProps(nextProps) {
    const { questions, params, addFlashMessage, deleteFlashMessages } = this.props;
    if (nextProps.questions !== questions && params.type !== undefined) {
      this.setState({
        questions: nextProps.questions,
        active: nextProps.params.type
      }, () => {
        const visible = this.state.questions.filter(question => question.visible === true);

        if (visible.length === 0) {
          addFlashMessage({
            type: 'error',
            text: 'Answers not found'
          });
        } else {
          deleteFlashMessages();
        }
      });
    }
  }

  getQuestions = (filter) => {
    this.props.getQuestions(filter).then(
      () => {
        const { questions } = this.props;
        this.setState({ questions });
      },
      err => console.error(err)
    );
  };

  removeQuestion = (id) => {
    const { params } = this.props;

    this.props.removeQuestionById(id);
    this.getQuestions(params.type || '');
  };

  changeQuestionField = (id, field, value) => {
    const { params } = this.props;
    this.props.changeQuestionField(id, field, value);
    this.getQuestions(params.type || '');
  }

  filter = (route) => {
    const { routes } = this.context.router;
    const path = routes[1].path;

    this.context.router.push(`${path}/${route}`);
    this.props.filterQuestions(route);
    this.setState({ active: route });
  };

  render() {
    return (
      <Row className="show-grid">
        <Col md={3} sm={4}>
          <QuestionsBar active={this.state.active} filter={this.filter} questions={this.props.questions} />
        </Col>
        <Col md={9} sm={8}>
          {this.state.questions && this.state.questions.filter(q => q.visible === true).map((question, index) => (
            <Question
              ans={question}
              index={index}
              remove={this.removeQuestion}
              changeQuestionField={this.changeQuestionField}
              key={shortid.generate()}
            />
          ))}
        </Col>
      </Row >
    );
  }
}

QuestionsPage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  filterQuestions: PropTypes.func.isRequired,
  removeQuestionById: PropTypes.func.isRequired,
  changeQuestionField: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  deleteFlashMessages: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired
};

QuestionsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  questions: state.questions
});

export default connect(mapStateToProps, { getQuestions, filterQuestions, removeQuestionById, changeQuestionField, addFlashMessage, deleteFlashMessages })(QuestionsPage);
