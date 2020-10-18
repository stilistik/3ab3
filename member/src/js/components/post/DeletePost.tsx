import React from 'react';
import { IconButton } from '@material-ui/core';
import { Icon, DeleteConfirmPopover, Message } from 'Components/index';
import { useMutation } from 'react-apollo';
import { DELETE_POST } from 'Graphql/mutations';
import { Post } from 'Graphql/types';
import { useCurrentUser } from 'Components/user';

interface DeletePostProps {
  post: Post;
  refetch: () => Promise<any>;
}

export const DeletePost: React.FC<DeletePostProps> = ({ post, refetch }) => {
  const [deletePost] = useMutation(DELETE_POST);
  const user = useCurrentUser();

  const handleClick = () => {
    deletePost({
      variables: { postId: post.id },
    })
      .then(() => refetch())
      .catch((error) => Message.error(error.message));
  };

  if (!user || user.id !== post.author.id) return null;
  return (
    <DeleteConfirmPopover>
      <IconButton onClick={handleClick}>
        <Icon type="delete" />
      </IconButton>
    </DeleteConfirmPopover>
  );
};
