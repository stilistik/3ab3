import React from 'react';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { IconButton, Typography, Button } from '@material-ui/core';
import { ProfileAvatar, Icon, Box } from 'Components';
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
      <Box.Row>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="avatar-upload"
          type="file"
          onChange={(e) => this.props.onChange(e.target.files[0])}
        />
        <ProfileAvatar classes={{ avatar: styles.avatar, typo: styles.typo }} />
        <Box ml={2}>
          <Typography variant="body2">Profile Image</Typography>
          <label htmlFor="avatar-upload">
            <Button component="span">Upload</Button>
          </label>
        </Box>
      </Box.Row>
    );
  }
}

export default connect(null, mapDispatchToProps)(AvatarUpload);
