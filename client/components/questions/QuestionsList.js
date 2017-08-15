import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Question from './Question';

import { getQuestions, getQuestionsBySkill, filterQuestions, removeQuestionById, changeQuestionField, voteQuestion } from '../../actions/questionActions';
import { addFlashMessage } from '../../actions/flashMessages';
import { selectUser } from '../../selectors';


class QuestionsList extends Component {
  state = {
    active: '',
    activePage: 1,
    pages: 0,
    skills: []
  };

  componentDidMount() {
    // this.getSkills();
    // this.props.getQuestions();
    // this.pageContent(this.props.params.page || 1);
  }

  componentWillReceiveProps(nextProps) {
    // const { questions, addFlashMessage } = this.props;
    // if (nextProps.questions !== questions) {
    //   this.setState({
    //     active: nextProps.params.type || ''
    //   }, () => {
    //     const visible = nextProps.questions.filter(question => question.visible === true);

    //     if (visible.length === 0) {
    //       addFlashMessage({
    //         type: 'error',
    //         text: 'Answers not found'
    //       });
    //     }
    //   });
    // }
  }

  render() {
    const { questions, user, removeQuestionById, changeQuestionField, voteQuestion } = this.props;
    const filteredQuestions = questions.filter(q => q.visible === true);

    return (
      <div>
        {map(filteredQuestions, (question, index) => (
          <Question
            ans={question}
            index={index}
            remove={removeQuestionById}
            changeQuestionField={changeQuestionField}
            voteQuestion={voteQuestion}
            key={question._id}
            user={user}
          />
        ))}
      </div>
    );
  }
}

QuestionsList.propTypes = {
  getQuestionsBySkill: PropTypes.func.isRequired,
  filterQuestions: PropTypes.func.isRequired,
  removeQuestionById: PropTypes.func.isRequired,
  changeQuestionField: PropTypes.func.isRequired,
  voteQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: selectUser(state),
  // questions: selectAllQuestions(state),
  flashMessages: state.flashMessages
});

export default connect(mapStateToProps, { getQuestions, getQuestionsBySkill, filterQuestions, removeQuestionById, changeQuestionField, addFlashMessage, voteQuestion })(QuestionsList);
