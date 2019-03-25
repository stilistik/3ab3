import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
} from '@material-ui/core';
import { Icon, UserAvatar, ImageDiv } from 'Components';
import ImageInput from './ImageInput';

import styles from './CreatePostForm.css';

const QUERY = gql`
  query {
    currentUser {
      id
      name
      avatar
    }
  }
`;

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      file: null,
      src: null,
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => this.setState({ src: e.target.result });
    reader.readAsDataURL(file);
    this.setState({ file });
  };

  onSubmit = async () => {
    if (this.state.value.length === 0 && !this.state.file) return;
    await this.props.onSubmit({
      userId: this.props.user.id,
      text: this.state.value,
      image: this.state.file,
    });
    this.setState({ value: '', file: null, src: null });
  };

  render() {
    if (!this.props.user) return null;
    return (
      <Card>
        <CardContent>
          <div className={styles.content}>
            <UserAvatar user={this.props.user} className={styles.avatar} />
            <TextField
              value={this.state.value}
              onChange={this.onChange}
              multiline
              placeholder="Write something..."
              style={{ width: '100%' }}
            />
            <ImageInput onChange={this.onImageChange} />
          </div>
          {this.state.src ? (
            <ImageDiv
              image={this.state.src}
              classes={{ root: styles.preview }}
            />
          ) : null}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ width: '100%' }}
            onClick={this.onSubmit}
          >
            Post <Icon type="send" style={{ marginLeft: '10px' }} />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ user: data.currentUser }),
})(CreatePostForm);
