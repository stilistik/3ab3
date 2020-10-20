import React from 'react';
import { IconButton } from '@material-ui/core';
import { FormDialog, Icon, Message, TextField } from 'Components/index';
import { Document } from 'Graphql/types';
import { useMutation } from 'react-apollo';
import { EDIT_DOCUMENT } from 'Graphql/mutations';
import { Serializable } from 'Components/form/types';
import { useTranslation } from 'react-i18next';
import { DOCUMENT_LIST } from 'Graphql/queries';

interface EditDocumentProps {
  document: Document;
}

export const EditDocument: React.FC<EditDocumentProps> = ({ document }) => {
  const [show, setShow] = React.useState(false);
  const [editDocument] = useMutation(EDIT_DOCUMENT);
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    editDocument({
      variables: { documentId: document.id, input: values },
      refetchQueries: () => [{ query: DOCUMENT_LIST }],
    }).catch((error) => Message.error(error.message));
    setShow(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick} style={{ color: '#444' }}>
        <Icon type="edit" />
      </IconButton>
      <FormDialog
        title={t('Edit Document')}
        show={show}
        onCancel={handleClose}
        onSubmit={handleSubmit}
        initValues={document}
      >
        <TextField id="name" label={t('Document Title')} required={true} />
      </FormDialog>
    </React.Fragment>
  );
};
