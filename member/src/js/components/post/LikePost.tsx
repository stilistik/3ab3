import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { Button, makeStyles } from '@material-ui/core';
import { Icon } from 'Components/index';
import { POST_STATS, CURRENT_USER_LIKED_POSTS } from 'Graphql/queries';
import { LIKE_POST, UNLIKE_POST } from 'Graphql/mutations';
import { Post, User } from 'Graphql/types';
import { useCurrentUser } from 'Components/user';
import clx from 'classnames';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  liked: { color: '#1a77ad' },
});

interface LikePostProps {
  post: Post;
}

export const LikePost: React.FC<LikePostProps> = ({ post }) => {
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const { id: userId } = useCurrentUser();
  const styles = useStyles();
  const { t } = useTranslation();

  const { loading, error, data } = useQuery(CURRENT_USER_LIKED_POSTS);

  if (loading || error) return null;

  const user: User = data.currentUser;
  const liked = user.likedPosts.some((el) => el.id === post.id);

  const onClick = () => {
    const mutate = liked ? unlikePost : likePost;
    mutate({
      variables: {
        postId: post.id,
        userId: userId,
      },
      refetchQueries: () => [
        { query: CURRENT_USER_LIKED_POSTS },
        { query: POST_STATS, variables: { postId: post.id } },
      ],
    });
  };

  return (
    <Button
      size="small"
      className={clx({ [styles.liked]: liked })}
      color="primary"
      onClick={onClick}
    >
      <Icon type="like" style={{ marginRight: '5px' }} /> {t('Like')}
    </Button>
  );
};
