import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Link } from 'react-router';
import MarkdownRenderer from 'react-markdown-renderer';
import map from 'lodash/map';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Label from 'react-bootstrap/lib/Label';
import Well from 'react-bootstrap/lib/Well';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Modal from 'react-bootstrap/lib/Modal';
import Panel from 'react-bootstrap/lib/Panel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import Toolbar from '../overall/Toolbar';

class Question extends Component {
  static propTypes = {
    ans: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    remove: PropTypes.func.isRequired,
    voteQuestion: PropTypes.func.isRequired,
    changeQuestionField: PropTypes.func.isRequired
  };

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
    const { user, ans } = this.props;

    if (user.username === ans.author.username) {
      this.setState({
        showModal: true,
        answerField,
        textField: field
      });
    }
  };

  render() {
    const { ans, index, remove, changeQuestionField, user, voteQuestion } = this.props;

    const panelHeader = (
      <div className="clearfix">
        <h3 className="panel-title pull-left">
          <strong style={{ marginBottom: 5, display: 'block' }}>Question {index + 1}:</strong>
          <span className="edit-field" onClick={() => this.open(ans.question, 'question')}>
            <MarkdownRenderer markdown={ans.question} />
          </span>
        </h3>
        <div className="pull-right">
          {ans.level && map(ans.level, level => (
            <Label
              style={{ margin: '0 3px' }}
              bsStyle="primary"
              key={shortid.generate()}
            >{level}</Label>
          ))}
        </div>
      </div>
    );

    const panelFooter = (
      <div className="clearfix">
        <h5 className="pull-left">
          <strong>Skill</strong>:
            {ans.skill && map(ans.skill, skill => (
            <span
              key={shortid.generate()}
            >{' '}{skill}</span>
          ))}
        </h5>
        <Label
          bsStyle="warning"
          className="pull-right"
        >{ans.theory}</Label>
      </div>
    );

    return (
      <Panel header={panelHeader} footer={panelFooter}>
        <ListGroup fill>
          {ans.answer &&
            <ListGroupItem bsStyle="success" style={{ whiteSpace: 'pre-wrap' }} onClick={() => this.open(ans.answer, 'answer')}>
              <MarkdownRenderer markdown={ans.answer} />
            </ListGroupItem>}
          {ans.answers && map(ans.answers, (ans, index) => (
            <ListGroupItem
              key={shortid.generate()}
              style={{ whiteSpace: 'pre-wrap' }}
              onClick={() => this.open(ans, `answers.${index}.text`)}
            >
              <MarkdownRenderer markdown={ans.text} />
            </ListGroupItem>
          ))}
        </ListGroup>

        {ans.notes &&
          <Well onClick={() => this.open(ans.notes, 'notes')}>
            <MarkdownRenderer markdown={ans.notes} />
          </Well>}
        <small><strong>Author</strong>: {ans.author.username}</small>

        <hr />

        {user.username === ans.author.username &&
          <ButtonGroup bsSize="small" className="pull-right">
            <Link to={`/question/${ans._id}`} className="btn btn-warning"><Glyphicon glyph="pencil" /> Edit</Link>
            <Button bsStyle="danger" onClick={() => this.openRemoveModel(ans._id)}><Glyphicon glyph="remove" /> Remove</Button>
          </ButtonGroup>
        }

        {user.username && <Toolbar
          user={user}
          question={ans}
          voteQuestion={voteQuestion}
        />}

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
                onClick={() => { changeQuestionField(ans._id, this.state.textField, this.textField.value, new Date()); this.close(); }}
              >Update</Button>
            </form>
          </Modal.Body>
        </Modal>

        <Modal bsSize="sm" show={this.state.showRemoveModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>If so, you will not be able to restore this question.</p>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button
                bsStyle="default"
                onClick={this.close}
              >Cancel</Button>
              <Button
                bsStyle="danger"
                onClick={() => remove(this.state._id)}
              >Remove</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </Panel >
    );
  }
}

export default Question;
