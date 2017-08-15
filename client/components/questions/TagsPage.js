import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionsList from './QuestionsList';
import QuestionsBar from './QuestionsBar';
import { getQuestionsBySkill } from '../../actions/questionActions';

class TagsPage extends Component {
  static propTypes = {
    getQuestionsBySkill: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    questions: [],
    skills: [],
    active: ''
  };

  componentDidMount() {
    this.filter(this.context.router.params.tag);
  }

  filter = (route = '') => {
    const { routes } = this.context.router;

    this.props.getQuestionsBySkill(route).then(
      ({ questions, skills }) => {
        this.context.router.push(`${routes[1].path}/${route}`);
        this.setState({ questions, skills, active: route || '' });
      });
  };

  render() {
    const { active, skills } = this.state;

    return (
      <div>
        <QuestionsBar active={active} skills={skills} filter={this.filter} />

        <hr />

        <QuestionsList questions={this.state.questions} />
      </div>
    );
  }
}

export default connect(null, { getQuestionsBySkill })(TagsPage);
