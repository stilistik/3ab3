import React from 'react';
import { connect } from 'react-redux';
import { hideMessage } from 'Redux/actions';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './MessageHandler.css';

const mapStateToProps = (state) => {
  return {
    message: state.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch(hideMessage());
    },
  };
};

class Message extends React.Component {
  render() {
    return (
      <SnackbarContent
        className={styles[this.props.type]}
        message={
          <div className={styles.message}>
            <Icon className={styles.icon} type={this.props.type} />
            {this.props.text}
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.props.onClose}
          >
            <Icon type="close" />
          </IconButton>,
        ]}
      />
    );
  }
}

class MessageHandler extends React.Component {
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.message.showing}
        autoHideDuration={4000}
        onClose={this.props.close}
      >
        <Message
          onClose={this.props.close}
          type={this.props.message.type}
          text={this.props.message.text}
        />
      </Snackbar>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageHandler);
