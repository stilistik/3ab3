import React from 'react';
import { UserAvatar, LinkValidator } from 'Components';
import CommentActions from './CommentActions';
import { MessageLink } from 'Pages/messenger/Message';

import styles from './Comment.less';

const Comment = ({ comment }) => {
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
