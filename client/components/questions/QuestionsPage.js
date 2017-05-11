import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import QuestionsList from './QuestionsList';
import QuestionsBar from './QuestionsBar';
import { getQuestions, filterQuestions, removeQuestionById, changeQuestionField } from '../../actions/questionActions';
import { addFlashMessage, deleteFlashMessages } from '../../actions/flashMessages';

class QuestionsPage extends Component {
  static propTypes = {
    getQuestions: PropTypes.func.isRequired,
    filterQuestions: PropTypes.func.isRequired,
    removeQuestionById: PropTypes.func.isRequired,
    changeQuestionField: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

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
        const visible = nextProps.questions.filter(question => question.visible === true);

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
    const { questions, user, removeQuestionById, changeQuestionField } = this.props;

    return (
      <Row>
        <Col md={3} sm={4}>
          <QuestionsBar active={this.state.active} filter={this.filter} questions={this.props.questions} />
        </Col>
        <Col md={9} sm={8} style={{ minHeight: 300 }}>
          <QuestionsList
            questions={questions}
            user={user}
            removeQuestionById={removeQuestionById}
            changeQuestionField={changeQuestionField}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  questions: state.questions,
  flashMessages: state.flashMessages
});

export default connect(mapStateToProps, { getQuestions, filterQuestions, removeQuestionById, changeQuestionField, addFlashMessage, deleteFlashMessages })(QuestionsPage);
