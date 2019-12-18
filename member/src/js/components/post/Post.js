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
import LikePost from './LikePost';
import DeletePost from './DeletePost';
import PostStats from './PostStats';
import PostComments from './PostComments';
import LinkValidator from './LinkValidator';
import YoutubeVideo from './YoutubeVideo';
import SpotifyPlayer from './SpotifyPlayer';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Microlink from '@microlink/react';

import styles from './Post.css';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-EN');

const PostHeader = ({ post, refetch }) => {
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
      <DeletePost post={post} refetch={refetch} />
    </div>
  );
};

export const PostImage = ({ url }) => {
  if (!url) return <Divider />;
  return <img src={url} width="100%" />;
};

const PostText = ({ text }) => {
  if (!text) return null;
  return (
    <Typography className={styles.text} variant="body2">
      {text}
    </Typography>
  );
};

export const PostLink = ({ link }) => {
  if (!link) return null;
  switch (link.type) {
    case 'IMAGE':
      return <PostImage url={link.url} />;
    case 'YOUTUBE':
      return <YoutubeVideo url={link.url} />;
    case 'SPOTIFY':
      return <SpotifyPlayer url={link.url} />;
    default:
      return (
        <Microlink
          url={link.url}
          style={{ borderLeft: 'none', borderRight: 'none' }}
        />
      );
  }
};

const Post = ({ post, refetch }) => {
  const [show, setShow] = React.useState(false);

  const onComment = () => {
    setShow(true);
  };

  const link = LinkValidator.validateLink(post.link);

  return (
    <Card>
      <PostHeader post={post} refetch={refetch} />
      <CardContent className={styles.content}>
        <PostText text={post.text} />
        {post.image && <PostImage url={global.API_URL + post.image} />}
        <PostLink link={link} />
      </CardContent>
      <PostStats postId={post.id} onComment={onComment} />
      <CardActions>
        <LikePost post={post} />
        <Button size="small" color="primary" onClick={onComment}>
          <Icon type="addComment" style={{ marginRight: '5px' }} /> Comment
        </Button>
      </CardActions>
      {show ? <PostComments postId={post.id} /> : null}
    </Card>
  );
};

export default Post;
