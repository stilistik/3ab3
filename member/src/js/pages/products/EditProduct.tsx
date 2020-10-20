import { Serializable } from 'Components/form/types';
import React from 'react';
import { useMutation } from 'react-apollo';
import { PRODUCT_LIST } from 'Graphql/queries';
import { EDIT_PRODUCT } from 'Graphql/mutations';
import { IconButton } from '@material-ui/core';
import {
  Box,
  Icon,
  FormDialog,
  ImageField,
  Message,
  NumberField,
  TextField,
} from 'Components/index';
import { Product } from 'Graphql/types';
import { useTranslation } from 'react-i18next';

interface EditProductProps {
  product: Product;
}

export const EditProduct: React.FC<EditProductProps> = ({ product }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const { t } = useTranslation();

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    const { thumbnail, ...rest } = values;
    const input = {
      thumbnail: thumbnail instanceof File ? thumbnail : null,
      ...rest,
    };
    editProduct({
      variables: { productId: product.id, input: input },
      refetchQueries: () => [{ query: PRODUCT_LIST }],
    })
      .then(() => Message.success(t('Product successfully edited')))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="edit" />
      </IconButton>
      <FormDialog
        title={t('Edit Product')}
        show={showDialog}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        initValues={product}
      >
        <Box cmb={2}>
          <ImageField
            id="thumbnail"
            required={true}
            label={t('Product Image')}
          />
          <TextField id="name" label={t('Name')} required={true} />
          <NumberField
            id="price"
            label={t('Price')}
            required={true}
            step={0.5}
          />
          <NumberField id="index" label={t('Index')} required={true} />
        </Box>
      </FormDialog>
    </React.Fragment>
  );
};
