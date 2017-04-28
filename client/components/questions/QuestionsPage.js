import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import classnames from 'classnames';

import Question from './Question';
import { getQuestionsRequest, removeQuestionById, changeQuestionField } from '../../actions/answerActions';
import { addFlashMessage } from '../../actions/flashMessages';

class QuestionsPage extends Component {
  state = {
    ans: [],
    errors: {},
    active: ''
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = (route) => {
    const { params } = this.props;

    this.props.getQuestionsRequest(route || params.type).then(
      (req) => {
        if (req.data.ans.length !== 0) {
          this.setState({
            ans: req.data.ans,
            active: route || params.type
          });
        } else {
          this.setState({
            ans: [],
            active: ''
          });
          this.props.addFlashMessage({
            type: 'error',
            text: 'Answers not found'
          });
        }
      },
      err => console.error('ERRROR', err)
    );
  };

  removeQuestion = (id) => {
    this.props.removeQuestionById(id);
    this.getQuestions();
  };

  changeQuestionField = (id, field, value) => {
    this.props.changeQuestionField(id, field, value);
    this.getQuestions();
  }

  clickHandler = (route) => {
    const { routes } = this.context.router;
    const path = routes[1].path;

    this.context.router.push(`${path}/${route}`);
    this.getQuestions(route);
  };

  render() {
    return (
      <div>
        <h3>Filter by Author:</h3>
        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'author:hamanovich' })}
              onClick={() => this.clickHandler('author:hamanovich')}
            >
              Hamanovich
            </button>
          </div>
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'author:admin' })}
              onClick={() => this.clickHandler('author:admin')}
            >
              Admin
            </button>
          </div>
        </div>

        <hr />

        <h3>Filter by Type:</h3>
        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'theory:theory' })}
              onClick={this.clickHandler.bind(null, 'theory:theory')}
            >
              Theory
            </button>
          </div>
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'theory:practice' })}
              onClick={this.clickHandler.bind(null, 'theory:practice')}
            >
              Practice
            </button>
          </div>
        </div>

        <hr />

        <h3>Filter by Level:</h3>
        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'level:junior' })}
              onClick={this.clickHandler.bind(null, 'level:junior')}
            >
              Junior
            </button>
          </div>
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'level:middle' })}
              onClick={this.clickHandler.bind(null, 'level:middle')}
            >
              Middle
            </button>
          </div>
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'level:senior' })}
              onClick={this.clickHandler.bind(null, 'level:senior')}
            >
              Senior
            </button>
          </div>
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'level:lead' })}
              onClick={this.clickHandler.bind(null, 'level:lead')}
            >
              Lead
            </button>
          </div>
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'level:chief' })}
              onClick={this.clickHandler.bind(null, 'level:chief')}
            >
              Chief
            </button>
          </div>
        </div>

        <hr />

        {this.state.ans && this.state.ans.map(ans => (
          <Question ans={ans} remove={this.removeQuestion} changeQuestionField={this.changeQuestionField} key={shortid.generate()} />
        ))}
      </div>
    );
  }
}

QuestionsPage.propTypes = {
  getQuestionsRequest: PropTypes.func.isRequired,
  removeQuestionById: PropTypes.func.isRequired,
  changeQuestionField: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

QuestionsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { getQuestionsRequest, removeQuestionById, changeQuestionField, addFlashMessage })(QuestionsPage);
