import gql from 'graphql-tag';

export const UPLOAD_DOCUMENT = gql`
  mutation($input: UploadDocumentInput!) {
    uploadDocument(input: $input) {
      id
    }
  }
`;
