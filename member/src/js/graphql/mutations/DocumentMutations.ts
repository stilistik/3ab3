import gql from 'graphql-tag';

export const UPLOAD_DOCUMENT = gql`
  mutation($input: UploadDocumentInput!) {
    uploadDocument(input: $input) {
      id
    }
  }
`;

export const EDIT_DOCUMENT = gql`
  mutation($documentId: ID!, $input: EditDocumentInput!) {
    editDocument(documentId: $documentId, input: $input) {
      id
    }
  }
`;
