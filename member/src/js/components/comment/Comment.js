import React from 'react';
import { UserAvatar, LinkValidator } from 'Components';
import CommentActions from './CommentActions';
import { MessageLink } from 'Pages/messenger/Message';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  comment: {
    padding: '0px 16px',
    marginBottom: '7px',
    maxWidth: '100%',
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  user: {
    color: '#1a77ad',
    fontWeight: 'bold',
    marginRight: '8px',
  },
  avatar: {
    width: '1.7em',
    height: '1.7em',
  },
  text: {
    whiteSpace: 'normal',
    alignSelf: 'center',
    padding: '0.35em 0.7em',
    marginLeft: '10px',
    background: theme.palette.action.hover,
    borderRadius: '15px',
  },
}));

const Comment = ({ comment }) => {
  const styles = useStyles();
  const [validatedLink, setValidatedLink] = React.useState(null);

  React.useEffect(() => {
    if (!comment.link) return;
    LinkValidator.validateLink(comment.link).then((validated) => {
      setValidatedLink(validated);
    });
  }, [comment.link]);

  return (
    <div className={styles.comment}>
      <div className={styles.content}>
        <UserAvatar user={comment.author} classes={{ avatar: styles.avatar }} />
        <div className={styles.text}>
          <MessageLink link={validatedLink} />
          <span className={styles.user}>{comment.author.name}</span>
          <span>{comment.text}</span>
        </div>
      </div>
      <CommentActions comment={comment} />
    </div>
  );
};

export default Comment;
