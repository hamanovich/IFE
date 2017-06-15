import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import uniqueId from 'lodash/uniqueId';
import { connect } from 'react-redux';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Modal from 'react-bootstrap/lib/Modal';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import { updateUser } from '../../actions/signupActions';

class Toolbar extends Component {
  static propTypes = {
    size: PropTypes.string,
    user: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    voteQuestion: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
  };

  static defaultProps = {
    size: 'small'
  };

  state = {
    showToolbarModal: false,
    createNew: false
  };

  close = () => {
    this.setState({
      showToolbarModal: false
    });
  };

  openToolbarModel = () => {
    this.setState({
      showToolbarModal: true
    });
  };

  done = () => {
    console.log('done');
    if (this.state.createNew && this.listTitle.value) {
      console.log(this.listTitle.value, this.props.user);
      // console.log('N', {...this.props.user, lists:})
      const updatedUser = {
        ...this.props.user,
        lists: {
          ...this.props.user.lists,
          [this.listTitle.value]: []
        }
      };
      this.props.updateUser(updatedUser).then(
        () => console.log('OK'),
        () => console.log('ERR')
      );

      console.log('U', updatedUser);
    }
    // this.close();
  };

  changeOption = (e) => {
    this.setState({
      createNew: (e.target.value === 'new')
    });
  };

  render() {
    const { size, question: { _id, votes }, user, voteQuestion } = this.props;
    const liked = votes.like.findIndex(questionId => questionId === user._id);
    const disliked = votes.dislike.findIndex(questionId => questionId === user._id);
    const chooseList = map([1, 2, 3], int =>
      <option
        value={`${int} 2312312`}
        key={uniqueId()}
      >{int}</option>);

    console.log(user)

    return (
      <ButtonGroup bsSize={size}>
        <Button
          bsStyle="info"
          onClick={this.openToolbarModel}
        >
          <Glyphicon glyph="star" />
        </Button>
        <Button
          bsStyle="success"
          className={liked > -1 && 'active'}
          onClick={() => liked === -1 && voteQuestion(_id, 'votes.like', user._id)}
        >
          <Glyphicon glyph="thumbs-up" /> {votes.like.length}
        </Button>

        <Button
          bsStyle="danger"
          className={disliked > -1 && 'active'}
          onClick={() => disliked === -1 && voteQuestion(_id, 'votes.dislike', user._id)}
        >
          <Glyphicon glyph="thumbs-down" /> {votes.dislike.length}
        </Button>

        <Modal bsSize="lg" show={this.state.showToolbarModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Choose list or create new one</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Choose option:</ControlLabel>
              <FormControl
                componentClass="select"
                onChange={this.changeOption}
              >
                <option value="">select any</option>
                <option value="23">select any 223</option>
                {chooseList}
                <option value="new">or create new</option>
              </FormControl>
            </FormGroup>

            {this.state.createNew && <FormGroup controlId="formBasicText">
              <ControlLabel>Create new list of questions</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter title"
                inputRef={(input) => { this.listTitle = input; }}
              />
            </FormGroup>}

          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button
                bsStyle="default"
                onClick={this.close}
              >Cancel</Button>
              <Button
                bsStyle="success"
                onClick={() => this.done()}
              >Done</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </ButtonGroup >
    );
  }
}


export default connect(null, { updateUser })(Toolbar);
