import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import classnames from 'classnames';

import Question from './Question';
import { getQuestionsRequest } from '../../actions/answerActions';
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

  getQuestions = () => {
    const { params } = this.props;
    this.props.getQuestionsRequest(params.type).then(
      (req) => {
        if (req.data.ans.length !== 0) {
          this.setState({ ans: req.data.ans });
        } else {
          this.props.addFlashMessage({
            type: 'error',
            text: 'Answers not found'
          });
        }
      },
      err => console.error('ERRROR', err)
    );
  };

  clickHandler = () => {

  };

  render() {
    return (
      <div>
        <h3>Filter by Type:</h3>
        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === '' })}
              onClick={this.clickHandler.bind(null, '')}
            >
              All
            </button>
          </div>
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'theory' })}
              onClick={this.clickHandler.bind(null, 'type/theory')}
            >
              Theory
            </button>
          </div>
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'practice' })}
              onClick={this.clickHandler.bind(null, 'type/practice')}
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
              className={classnames('btn btn-default', { active: this.state.active === 'level/1' })}
              onClick={this.clickHandler.bind(null, 'level/1')}
            >
              Level 1
            </button>
          </div>
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'level/1' })}
              onClick={this.clickHandler.bind(null, 'level/2')}
            >
              Level 2
            </button>
          </div>
          <div className="btn-group">
            <button
              className={classnames('btn btn-default', { active: this.state.active === 'level/3' })}
              onClick={this.clickHandler.bind(null, 'level/3')}
            >
              Level 3
            </button>
          </div>
        </div>

        <hr />

        {this.state.ans && this.state.ans.map(ans => (
          <Question ans={ans} key={shortid.generate()} />
        ))}
      </div>
    );
  }
}

QuestionsPage.propTypes = {
  getQuestionsRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

QuestionsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { getQuestionsRequest, addFlashMessage })(QuestionsPage);
