import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Link } from 'react-router';

import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/Label';
import Well from 'react-bootstrap/lib/Well';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Modal from 'react-bootstrap/lib/Modal';
import Panel from 'react-bootstrap/lib/Panel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class Question extends Component {
  state = {
    showModal: false,
    showRemoveModal: false,
    answerField: null,
    _id: ''
  };

  close = () => {
    this.setState({
      showModal: false,
      showRemoveModal: false,
      answerField: null,
      _id: ''
    });
  };

  openRemoveModel = (_id) => {
    this.setState({
      showRemoveModal: true,
      _id
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

    const panelHeader = (
      <div className="clearfix">
        <h3 className="panel-title pull-left">
          <strong>Question</strong>:
            <span className="edit-field" onClick={() => this.open(ans.question, 'question')}>{ans.question}</span>
        </h3>
        <div className="pull-right">
          {ans.level && ans.level.map((level, index) => (
            <Label
              style={{ margin: '0 3px' }}
              bsStyle="primary"
              key={shortid.generate()}
              onClick={() => this.open(level, `level.${index}`)}
            >{level}</Label>
          ))}
        </div>
      </div>
    );

    const panelFooter = (
      <div className="clearfix">
        <h5 className="pull-left">
          <strong>Section</strong>:
            {ans.section && ans.section.map((section, index) => (
            <span
              key={shortid.generate()}
              onClick={() => this.open(section, `section.${index}`)}
            >{section}{' '}</span>
          ))}
        </h5>
        <Label
          bsStyle="warning"
          className="pull-right"
          onClick={() => this.open(ans.theory, 'theory')}
        >{ans.theory}</Label>
      </div>
    );

    return (
      <Panel header={panelHeader} footer={panelFooter}>
        <ListGroup>
          {ans.answer &&
            <ListGroupItem className="active" onClick={() => this.open(ans.answer, 'answer')}>
              {ans.answer}
            </ListGroupItem>}
          {ans.answers && ans.answers.map((ans, index) => (
            <ListGroupItem
              key={shortid.generate()}
              onClick={() => this.open(ans, `answers.${index}.text`)}
            >
              {ans.text}
            </ListGroupItem>
          ))}
        </ListGroup>

        {ans.notes && <Well onClick={() => this.open(ans.notes, 'notes')}>{ans.notes}</Well>}
        <small><strong>Author</strong>: {ans.author}</small>

        <hr />

        <Link to={`/question/${ans._id}`} className="btn btn-warning">Edit</Link> {' '}
        <button className="btn btn-danger" onClick={() => this.openRemoveModel(ans._id)}>Remove</button>

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
                  inputRef={(ref) => { this.textField = ref; }}
                  defaultValue={(this.state.answerField && this.state.answerField.text)
                    ? this.state.answerField.text
                    : this.state.answerField}
                  rows="10"
                />
              </FormGroup>
              <Button
                bsStyle="primary"
                onClick={() => changeQuestionField(ans._id, this.state.textField, this.textField.value)}
              >Update</Button>
            </form>
          </Modal.Body>
        </Modal>

        <Modal bsSize="sm" show={this.state.showRemoveModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              bsStyle="danger"
              onClick={() => remove(this.state._id)}
            >Remove</Button>
            {' '}
            <Button
              bsStyle="default"
              onClick={this.close}
            >Cancel</Button>
          </Modal.Body>
        </Modal>
      </Panel>
    );
  }
}

Question.propTypes = {
  ans: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  changeQuestionField: PropTypes.func.isRequired
};

export default Question;
