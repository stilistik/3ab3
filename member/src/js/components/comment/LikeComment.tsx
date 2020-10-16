import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { Link, makeStyles } from '@material-ui/core';
import { COMMENT_STATS, CURRENT_USER_LIKED_COMMENTS } from 'Graphql/queries';
import { LIKE_COMMENT, UNLIKE_COMMENT } from 'Graphql/mutations';
import { Comment, User } from 'Graphql/types';
import { useCurrentUser } from 'Components/user';
import { useTranslation } from 'react-i18next';

interface LikeCommentProps {
  comment: Comment;
}

export const LikeComment: React.FC<LikeCommentProps> = ({ comment }) => {
  const [likeComment] = useMutation(LIKE_COMMENT);
  const [unlikeComment] = useMutation(UNLIKE_COMMENT);
  const { id: userId } = useCurrentUser();
  const { t } = useTranslation();

  const { loading, error, data } = useQuery(CURRENT_USER_LIKED_COMMENTS);

  if (loading || error) return null;

  const user: User = data.currentUser;
  const liked = user.likedComments.some((el) => el.id === comment.id);

  const onClick = () => {
    const mutate = liked ? unlikeComment : likeComment;
    mutate({
      variables: {
        commentId: comment.id,
        userId: userId,
      },
      refetchQueries: () => [
        { query: CURRENT_USER_LIKED_COMMENTS },
        { query: COMMENT_STATS, variables: { commentId: comment.id } },
      ],
    });
  };

  return (
    <Link
      component="button"
      variant="body2"
      color="secondary"
      onClick={onClick}
    >
      {liked ? t('Unlike') : t('Like')}
    </Link>
  );
};
