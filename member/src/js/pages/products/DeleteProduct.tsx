import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { Icon, ConfirmationDialog, Message } from 'Components/index';
import { Product } from 'Graphql/types';
import { useMutation } from 'react-apollo';
import { DELETE_USER } from 'Graphql/mutations';
import { PRODUCT_LIST } from 'Graphql/queries';
import { Trans, useTranslation } from 'react-i18next';

interface DeleteProductProps {
  product: Product;
}

export const DeleteProduct: React.FC<DeleteProductProps> = ({ product }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [deleteUser] = useMutation(DELETE_USER);
  const { t } = useTranslation();

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleDelete = () => {
    deleteUser({
      variables: { productId: product.id },
      refetchQueries: () => [{ query: PRODUCT_LIST }],
    })
      .then(() => Message.success(t('Product successfully deleted')))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  const name = product.name;
  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="delete" />
      </IconButton>
      <ConfirmationDialog
        show={showDialog}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        title={t('Delete Product')}
      >
        <Typography variant="body2">
          <Trans i18nKey="deleteProductConfirm">
            Do you really want to delete the product <strong>{{ name }}</strong>
            ? This is an irreversible action, all data related to the product
            will be lost. Continue?
          </Trans>
        </Typography>
      </ConfirmationDialog>
    </React.Fragment>
  );
};
