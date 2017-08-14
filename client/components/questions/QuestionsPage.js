import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import QuestionsList from './QuestionsList';
import QuestionsBar from './QuestionsBar';
import PaginationBar from '../overall/PaginationBar';
import { getQuestions, filterQuestions, removeQuestionById, changeQuestionField, voteQuestion } from '../../actions/questionActions';
import { addFlashMessage } from '../../actions/flashMessages';
import { selectUser, selectAllQuestions, selectAllTypes, selectAllSkills, selectAllLevels } from '../../selectors';

class QuestionsPage extends Component {
  static propTypes = {
    getQuestions: PropTypes.func.isRequired,
    filterQuestions: PropTypes.func.isRequired,
    removeQuestionById: PropTypes.func.isRequired,
    changeQuestionField: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    voteQuestion: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.object.isRequired,
    types: PropTypes.object.isRequired,
    skills: PropTypes.object.isRequired,
    levels: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    active: '',
    activePage: 1,
    pages: 0
  };

  componentDidMount() {
    this.pageContent(this.props.params.page || 1);
  }

  componentWillReceiveProps(nextProps) {
    const { questions, addFlashMessage } = this.props;
    if (nextProps.questions !== questions) {
      this.setState({
        active: nextProps.params.type || ''
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

  pageContent = (eventKey) => {
    const { addFlashMessage, getQuestions } = this.props;

    getQuestions(eventKey)
      .then(
      ({ pages }) => {
        this.setState({ pages, activePage: Number(eventKey) });
        this.context.router.push(`${this.context.router.routes[1].path}/page/${eventKey}`);
      },
      (err) => {
        addFlashMessage({
          type: 'error',
          text: err.response.data.error
        });
      }
      );
  };

  filter = (route) => {
    this.context.router.push(`${this.context.router.routes[1].path}/${route}`);
    this.props.filterQuestions(route);
    this.setState({ active: route });
  };

  render() {
    const { questions, user, removeQuestionById, changeQuestionField, types, skills, levels, voteQuestion } = this.props;
    const filteredQuestions = questions.filter(q => q.visible === true);

    const hasQuestions = (
      <Row>
        <Col md={3} sm={4}>
          <QuestionsBar
            active={this.state.active}
            filter={this.filter}
            selector={{ types, skills, levels }}
          />
        </Col>
        <Col md={9} sm={8} style={{ minHeight: 300 }}>
          <QuestionsList
            questions={filteredQuestions}
            user={user}
            removeQuestionById={removeQuestionById}
            changeQuestionField={changeQuestionField}
            voteQuestion={voteQuestion}
          />

          <PaginationBar
            activePage={this.state.activePage}
            pageContent={this.pageContent}
            pages={this.state.pages}
          />
        </Col>
      </Row>
    );

    return (
      <div>
        {questions.length === 0 ? <QuestionsList /> : hasQuestions}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: selectUser(state),
  questions: selectAllQuestions(state),
  flashMessages: state.flashMessages,
  types: selectAllTypes(state),
  skills: selectAllSkills(state),
  levels: selectAllLevels(state)
});

export default connect(mapStateToProps, { getQuestions, filterQuestions, removeQuestionById, changeQuestionField, addFlashMessage, voteQuestion })(QuestionsPage);
