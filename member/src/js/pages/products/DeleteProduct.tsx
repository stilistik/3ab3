import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { Icon, ConfirmationDialog, Message } from 'Components/index';
import { Product } from 'Graphql/types';
import { useMutation } from 'react-apollo';
import { DELETE_USER } from 'Graphql/mutations';
import { PRODUCT_LIST } from 'Graphql/queries';

interface DeleteProductProps {
  product: Product;
}

export const DeleteProduct: React.FC<DeleteProductProps> = ({ product }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleDelete = () => {
    deleteUser({
      variables: { productId: product.id },
      refetchQueries: () => [{ query: PRODUCT_LIST }],
    })
      .then(() => Message.success('User successfully deleted.'))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="delete" />
      </IconButton>
      <ConfirmationDialog
        show={showDialog}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        title="Delete Product"
      >
        <Typography variant="body2">
          Do you really want to delete the product {product.name}? This is an
          irreversible action, all data related to the product will be lost.
          Continue?
        </Typography>
      </ConfirmationDialog>
    </React.Fragment>
  );
};
