import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { IconButton } from '@material-ui/core';
import { ProfileAvatar, Icon } from 'Components';

import styles from './AvatarUpload.css';

const UPDATE_QUERY = gql`
  query {
    users {
      id
    }
  }
`;

const MUTATION = gql`
  mutation($file: Upload!) {
    uploadAvatar(file: $file) {
      id
    }
  }
`;

class AvatarUpload extends React.Component {
  onChange = async (file) => {
    try {
      const data = await this.uploadAvatar({
        variables: { file },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(uploadAvatar) => {
          this.uploadAvatar = uploadAvatar;
          return <AvatarDisplay onChange={this.onChange} />;
        }}
      </Mutation>
    );
  }
}

class AvatarDisplay extends React.Component {
  render() {
    return (
      <div>
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
            <ProfileAvatar style={{ width: '100px', height: '100px' }} />
          </IconButton>
        </label>
      </div>
    );
  }
}

export default AvatarUpload;
