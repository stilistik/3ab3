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
import PostStats from './stats/PostStats';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import styles from './Post.css';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-EN');

const PostHeader = ({ user, date }) => {
  return (
    <div className={styles.header}>
      <UserAvatar user={user} className={styles.avatar} />
      <div>
        <Typography className={styles.username}>{user.name}</Typography>
        <Typography className={styles.date}>
          {timeAgo.format(new Date(date))}
        </Typography>
      </div>
    </div>
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
        <PostHeader user={post.author} date={post.date} />
        <CardContent>
          <Typography component="p">{post.text}</Typography>
        </CardContent>
        <Divider />
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
