import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Badge from 'react-bootstrap/lib/Badge';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import Question from './Question';
import { getQuestions, removeQuestionById, changeQuestionField } from '../../actions/answerActions';
import { addFlashMessage, deleteFlashMessages } from '../../actions/flashMessages';

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

    this.props.getQuestions(route || params.type).then(
      (ans) => {
        if (ans.length !== 0) {
          this.setState({
            ans,
            active: route || params.type
          });
          this.props.deleteFlashMessages();
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
      <Row className="show-grid">
        <Col md={3} sm={4}>
          <ListGroup>
            <ListGroupItem header="Author:" />
            <ListGroupItem active={this.state.active === 'author:hamanovich'} onClick={() => this.clickHandler('author:hamanovich')}>Hamanovich <Badge>42</Badge></ListGroupItem>
            <ListGroupItem active={this.state.active === 'author:admin'} onClick={() => this.clickHandler('author:admin')}>Admin <Badge>42</Badge></ListGroupItem>
          </ListGroup>

          <ListGroup>
            <ListGroupItem header="Type:" />
            <ListGroupItem active={this.state.active === 'theory:theory'} onClick={() => this.clickHandler('theory:theory')}>Theory <Badge>42</Badge></ListGroupItem>
            <ListGroupItem active={this.state.active === 'theory:practice'} onClick={() => this.clickHandler('theory:practice')}>Practice <Badge>42</Badge></ListGroupItem>
          </ListGroup>

          <ListGroup>
            <ListGroupItem header="Level:" />
            <ListGroupItem active={this.state.active === 'level:junior'} onClick={() => this.clickHandler('level:junior')}>Junior <Badge>42</Badge></ListGroupItem>
            <ListGroupItem active={this.state.active === 'level:middle'} onClick={() => this.clickHandler('level:middle')}>Middle <Badge>42</Badge></ListGroupItem>
            <ListGroupItem active={this.state.active === 'level:senior'} onClick={() => this.clickHandler('level:senior')}>Senior <Badge>42</Badge></ListGroupItem>
            <ListGroupItem active={this.state.active === 'level:lead'} onClick={() => this.clickHandler('level:lead')}>Lead <Badge>42</Badge></ListGroupItem>
            <ListGroupItem active={this.state.active === 'level:chief'} onClick={() => this.clickHandler('level:chief')}>Chief <Badge>42</Badge></ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={9} sm={8}>
          {this.state.ans && this.state.ans.map(ans => (
            <Question
              ans={ans}
              remove={this.removeQuestion}
              changeQuestionField={this.changeQuestionField}
              key={shortid.generate()}
            />
          ))}
        </Col>
      </Row >
    );
  }
}

QuestionsPage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  removeQuestionById: PropTypes.func.isRequired,
  changeQuestionField: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  deleteFlashMessages: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

QuestionsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { getQuestions, removeQuestionById, changeQuestionField, addFlashMessage, deleteFlashMessages })(QuestionsPage);
