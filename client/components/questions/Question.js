import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shortid from 'shortid';

const Question = ({ ans, remove }) => (
  <div>
    <div className="panel panel-info">
      <div className="panel-heading clearfix">
        <h3 className="panel-title pull-left"><strong>Question</strong>: {ans.question}</h3>
        <div className="pull-right">
          {ans.level && ans.level.map(level => (
            <span
              style={{ margin: '0 3px' }}
              key={shortid.generate()}
              className={classnames('label', {
                'label-success': level === '1',
                'label-primary': level === '2',
                'label-info': level === '3',
                'label-warning': level === '4',
                'label-danger': level === '5'
              })}
            >{level}</span>
          ))}
        </div>
      </div>
      <div className="panel-body">
        <ul className="list-group">
          {ans.answer &&
            <li
              className="list-group-item active"
              key={shortid.generate()}
            >
              {ans.answer}
            </li>}
          {ans.answers && ans.answers.length > 2 && ans.answers.map(ans => (
            <li
              className="list-group-item"
              key={shortid.generate()}
            >
              {ans.text}
            </li>
          ))}
        </ul>
        {ans.notes && <div className="well">{ans.notes}</div>}
        <small><strong>Author</strong>: {ans.author}</small>
        <br />
        <button className="btn btn-danger" onClick={() => remove(ans._id)}>Remove</button>
      </div>
      <div className="panel-footer clearfix">
        <h5 className="pull-left">
          <strong>Section</strong>:
          {ans.section && ans.section.map(section => (
            <span key={shortid.generate()}>{section}{' '}</span>
          ))}
        </h5>
        <span
          className={classnames('pull-right label', {
            'label-danger': ans.theory === 'practice' || ans.theory === 'Practical',
            'label-warning': ans.theory === 'theory' || ans.theory === 'Theoretical'
          })}
        >{ans.theory}</span>
      </div>
    </div>
  </div>
);

Question.propTypes = {
  ans: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
};

export default Question;
