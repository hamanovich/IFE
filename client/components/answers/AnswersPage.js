import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import classnames from 'classnames';

import Answer from './Answer';
import { getAnswersRequest, getAnswersByType } from '../../actions/answerActions';

class AnswersPage extends Component {
  state = {
    ans: [],
    errors: {},
    active: ''
  };

  componentDidMount() {
    const { router } = this.context;
    router.push(router.routes[1].path);
    this.getAnswers();
  }

  getAnswers = () => {
    this.props.getAnswersRequest().then(
      req => this.setState({ ans: req.data.ans }),
      err => console.error('ERRROR', err)
    );
  };

  clickHandler = (type) => {
    this.props.getAnswersByType(type).then(
      (req) => {
        const { router } = this.context;
        this.setState({
          ans: req.data.ans,
          active: type
        });
        router.push(`${router.routes[1].path}/${type}`);
      },
      err => this.setState({ errors: err.response.data.errors })
    );
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

        {this.state.ans.map(ans => (
          <Answer ans={ans} key={shortid.generate()} />
        ))}
      </div>
    );
  }
}

AnswersPage.propTypes = {
  getAnswersRequest: PropTypes.func.isRequired,
  getAnswersByType: PropTypes.func.isRequired
};

AnswersPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { getAnswersRequest, getAnswersByType })(AnswersPage);
