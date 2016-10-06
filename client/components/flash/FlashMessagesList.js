import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteFlashMessage } from '../../actions/flashMessages';

import FlashMessage from './FlashMessage';

class FlashMessagesList extends Component {
  render() {
    const { deleteFlashMessage } = this.props;
    return (
      <div>
        {this.props.messages.map(message =>
          <FlashMessage key={message.id} message={message} deleteFlashMessage={deleteFlashMessage}/>
        )}
      </div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    messages: state.flashMessages
  };
};

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
