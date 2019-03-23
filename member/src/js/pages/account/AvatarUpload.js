import React from 'react';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { IconButton } from '@material-ui/core';
import { ProfileAvatar, Icon } from 'Components';
import { PROFILE_AVATAR } from 'Components';

import styles from './AvatarUpload.css';

const MUTATION = gql`
  mutation($file: Upload!) {
    uploadAvatar(file: $file) {
      id
    }
  }
`;

const mapDispatchToProps = (dispatch) => {
  return {
    message: (message) => {
      dispatch(showMessage(message));
    },
  };
};

class AvatarUpload extends React.Component {
  onChange = async (file) => {
    if (!file) return;
    try {
      await this.uploadAvatar({
        variables: { file },
        refetchQueries: () => {
          return [{ query: PROFILE_AVATAR }];
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  };

  handleError = (error) => {
    if (error.message.includes('File already exists'))
      this.props.message({ type: 'error', text: 'File already exists' });
    else
      this.props.message({
        type: 'error',
        text: 'Unknown error during upload',
      });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(uploadAvatar) => {
          this.uploadAvatar = uploadAvatar;
          return (
            <AvatarDisplay onChange={this.onChange} style={this.props.style} />
          );
        }}
      </Mutation>
    );
  }
}

class AvatarDisplay extends React.Component {
  render() {
    return (
      <div style={this.props.style}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          type="file"
          onChange={(e) => this.props.onChange(e.target.files[0])}
        />
        <label htmlFor="contained-button-file">
          <IconButton
            className={styles.button}
            style={{ padding: '0px' }}
            variant="contained"
            component="span"
          >
            <Icon className={styles.icon} type="upload" />
            <ProfileAvatar
              classes={{ avatar: styles.avatar, typo: styles.typo }}
            />
          </IconButton>
        </label>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AvatarUpload);
