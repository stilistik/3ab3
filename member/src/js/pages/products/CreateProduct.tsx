import { Serializable } from 'Components/form/types';
import React from 'react';
import { useMutation } from 'react-apollo';
import { PRODUCT_LIST } from 'Graphql/queries';
import { CREATE_PRODUCT } from 'Graphql/mutations';
import {
  Box,
  CreateButton,
  FormDialog,
  ImageField,
  Message,
  NumberField,
  TextField,
} from 'Components/index';
import { useTranslation } from 'react-i18next';

export const CreateProduct: React.FC = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const { t } = useTranslation();

  const handleClick = () => setShowDialog(true);

  const handleCancel = () => setShowDialog(false);

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    createProduct({
      variables: { input: values },
      refetchQueries: () => [{ query: PRODUCT_LIST }],
    })
      .then(() => Message.success(t('Product successfully created')))
      .catch((error) => Message.error(error.message));
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <CreateButton onClick={handleClick} />
      <FormDialog
        title={t('Create Product')}
        show={showDialog}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
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
