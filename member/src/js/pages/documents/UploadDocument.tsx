import { CreateButton, Icon, Message } from 'Components/index';
import React from 'react';
import { useMutation } from 'react-apollo';
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
      <CreateButton
        onClick={() => {
          document.getElementById('upload-document').click();
        }}
      />
    </React.Fragment>
  );
};
