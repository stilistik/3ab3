import { Icon, Message } from 'Components/index';
import React from 'react';
import { useMutation } from 'react-apollo';
import { IconButton } from '@material-ui/core';
import { UPLOAD_DOCUMENT } from 'Graphql/mutations';
import { DOCUMENT_LIST } from 'Graphql/queries';

export const UploadDocument: React.FC = () => {
  const [uploadDocument] = useMutation(UPLOAD_DOCUMENT);

  const handleChange = (file: File) => {
    uploadDocument({
      variables: {
        input: {
          file: file,
        },
      },
      refetchQueries: () => [{ query: DOCUMENT_LIST }],
    }).catch((error) => Message.error(error.message));
  };

  return (
    <React.Fragment>
      <input
        accept="application/pdf"
        style={{ display: 'none' }}
        id="upload-document"
        type="file"
        onChange={(e) => handleChange(e.target.files[0])}
      />
      <label htmlFor="upload-document">
        <IconButton component="span">
          <Icon type="edit" />
        </IconButton>
      </label>
    </React.Fragment>
  );
};
