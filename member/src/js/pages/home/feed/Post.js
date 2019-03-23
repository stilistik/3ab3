import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Divider,
} from '@material-ui/core';
import { Icon, UserAvatar } from 'Components';
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
  render() {
    const { post } = this.props;
    return (
      <Card>
        <PostHeader user={post.author} date={post.date} />
        <CardContent>
          <Typography component="p">{post.text}</Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton size="small" color="primary">
            <Icon type="comment" />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default Post;
