import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
} from '@material-ui/core';
import { Icon, UserAvatar } from 'Components';
import CreateComment from '../comment/CreateComment';
import CommentList from '../comment/CommentList';
import LikePost from './LikePost';
import DeletePost from './DeletePost';
import PostStats from './stats/PostStats';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import styles from './Post.css';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-EN');

const PostHeader = ({ post }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerleft}>
        <UserAvatar user={post.author} className={styles.avatar} />
        <div>
          <Typography className={styles.username}>
            {post.author.name}
          </Typography>
          <Typography className={styles.date}>
            {timeAgo.format(new Date(post.date))}
          </Typography>
        </div>
      </div>
      <DeletePost post={post} />
    </div>
  );
};

const PostImage = ({ image }) => {
  if (!image) return <Divider />;
  return <img src={global.API_URL + image} width="100%" />;
};

const PostText = ({ text }) => {
  if (!text) return null;
  return (
    <Typography className={styles.text} variant="body2">
      {text}
    </Typography>
  );
};

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  onComment = () => {
    this.setState({ show: true });
  };

  onLike = () => {
    return;
  };

  render() {
    const { post } = this.props;
    return (
      <Card>
        <PostHeader post={post} />
        <CardContent className={styles.content}>
          <PostText text={post.text} />
          <PostImage image={post.image} />
        </CardContent>
        <PostStats postId={post.id} onComment={this.onComment} />
        <CardActions>
          <LikePost post={post} />
          <Button size="small" color="primary" onClick={this.onComment}>
            <Icon type="addComment" style={{ marginRight: '5px' }} /> Comment
          </Button>
        </CardActions>
        {this.state.show ? (
          <div>
            <CreateComment post={post} />
            <CommentList postId={post.id} />
          </div>
        ) : null}
      </Card>
    );
  }
}

export default Post;
