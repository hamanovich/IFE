import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import Question from './Question';
import QuestionsBar from './QuestionsBar';
import { getQuestions, filterQuestions, removeQuestionById, changeQuestionField } from '../../actions/questionActions';
import { addFlashMessage, deleteFlashMessages } from '../../actions/flashMessages';

class QuestionsPage extends Component {
  state = {
    errors: {},
    active: ''
  };

  componentDidMount() {
    const { getQuestions, params } = this.props;

    getQuestions(params.type || '');
  }

  componentWillReceiveProps(nextProps) {
    const { questions, params, addFlashMessage } = this.props;
    if (nextProps.questions !== questions && params.type !== undefined) {
      this.setState({
        active: nextProps.params.type
      }, () => {
        const visible = questions.filter(question => question.visible === true);

        if (visible.length === 0) {
          addFlashMessage({
            type: 'error',
            text: 'Answers not found'
          });
        }
      });
    }
  }

  filter = (route) => {
    const { routes } = this.context.router;
    const path = routes[1].path;

    this.context.router.push(`${path}/${route}`);
    this.props.filterQuestions(route);
    this.setState({ active: route });
  };

  render() {
    const { questions, removeQuestionById, changeQuestionField } = this.props;

    return (
      <Row>
        <Col md={3} sm={4}>
          <QuestionsBar active={this.state.active} filter={this.filter} questions={this.props.questions} />
        </Col>
        <Col md={9} sm={8}>
          {questions && questions.filter(q => q.visible === true).map((question, index) => (
            <Question
              ans={question}
              index={index}
              remove={removeQuestionById}
              changeQuestionField={changeQuestionField}
              key={shortid.generate()}
            />
          ))}
        </Col>
      </Row>
    );
  }
}

QuestionsPage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  filterQuestions: PropTypes.func.isRequired,
  removeQuestionById: PropTypes.func.isRequired,
  changeQuestionField: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired
};

QuestionsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  questions: state.questions,
  flashMessages: state.flashMessages
});

export default connect(mapStateToProps, { getQuestions, filterQuestions, removeQuestionById, changeQuestionField, addFlashMessage, deleteFlashMessages })(QuestionsPage);
