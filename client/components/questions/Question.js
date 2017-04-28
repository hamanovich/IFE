import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shortid from 'shortid';
import { Link } from 'react-router';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class Question extends Component {
  state = {
    showModal: false,
    answerField: null
  };

  changeValue = (e) => {
    console.log(this.state);
    this.setState({ answerField: e.target.value });
  }

  update = (e) => {
    e.preventDefault();
    this.props.changeQuestionField(this.props.ans._id, this.state.textField, this.state.answerField);
  };

  close = () => {
    console.log('Close', this.state);
    this.setState({
      showModal: false,
      answerField: null
    });
  };

  open = (answerField, field) => {
    this.setState({
      showModal: true,
      answerField,
      textField: field
    });
  };

  render() {
    const { ans, remove, changeQuestionField } = this.props;

    return (
      <div>
        <div className="panel panel-info">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">
              <strong>Question</strong>:
            <span className="edit-field" onClick={() => this.open(ans.question, 'question')}>{ans.question}</span>
            </h3>
            <div className="pull-right">
              {ans.level && ans.level.map((level, index) => (
                <span
                  style={{ margin: '0 3px' }}
                  key={shortid.generate()}
                  onClick={() => this.open(level, `level.${index}`)}
                  className={classnames('label', {
                    'label-success': level === 'junior',
                    'label-primary': level === 'middle',
                    'label-info': level === 'senior',
                    'label-warning': level === 'lead',
                    'label-danger': level === 'chief'
                  })}
                >{level}</span>
              ))}
            </div>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {ans.answer &&
                <li className="list-group-item active" onClick={() => this.open(ans.answer, 'answer')}>
                  {ans.answer}
                </li>}
              {ans.answers && ans.answers.map((ans, index) => (
                <li
                  className="list-group-item"
                  key={shortid.generate()}
                  onClick={() => this.open(ans, `answers.${index}.text`)}
                >
                  {ans.text}
                </li>
              ))}
            </ul>
            {ans.notes && <div className="well" onClick={() => this.open(ans.notes, 'notes')}>{ans.notes}</div>}
            <small><strong>Author</strong>: {ans.author}</small>

            <hr />

            <Link to={`/question/${ans._id}`} className="btn btn-warning">Edit</Link> {' '}
            <button className="btn btn-danger" onClick={() => remove(ans._id)}>Remove</button>
          </div>
          <div className="panel-footer clearfix">
            <h5 className="pull-left">
              <strong>Section</strong>:
              {ans.section && ans.section.map((section, index) => (
                <span
                  key={shortid.generate()}
                  onClick={() => this.open(section, `section.${index}`)}
                >{section}{' '}</span>
              ))}
            </h5>
            <span
              onClick={() => this.open(ans.theory, 'theory')}
              className={classnames('pull-right label', {
                'label-danger': ans.theory === 'practice' || ans.theory === 'Practical',
                'label-warning': ans.theory === 'theory' || ans.theory === 'Theoretical'
              })}
            >{ans.theory}</span>
          </div>
        </div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Change value: <strong>{this.state.textField}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Change Field and press Update button</ControlLabel>
                <FormControl
                  name={this.state.textField}
                  componentClass="textarea"
                  onChange={this.changeValue}
                  defaultValue={(this.state.answerField && this.state.answerField.text) ? this.state.answerField.text : this.state.answerField}
                  rows="10"
                />
              </FormGroup>
              <Button
                bsStyle="primary"
                onClick={() => { console.log('click'); changeQuestionField(ans._id, this.state.textField, this.state.answerField); }}
              >Update</Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

Question.propTypes = {
  ans: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  changeQuestionField: PropTypes.func.isRequired
};

export default Question;
