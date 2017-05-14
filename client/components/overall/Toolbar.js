import React from 'react';
import PropTypes from 'prop-types';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

const Toolbar = ({ size, question, user, voteQuestion }) => {
  const { _id, votes } = question;
  const liked = votes.like.findIndex(questionId => questionId === user._id);
  const disliked = votes.dislike.findIndex(questionId => questionId === user._id);

  return (
    <ButtonGroup bsSize={size}>
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
    </ButtonGroup>
  );
};

Toolbar.propTypes = {
  size: PropTypes.string,
  user: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  voteQuestion: PropTypes.func.isRequired
};

Toolbar.defaultProps = {
  size: 'small'
};

export default Toolbar;
