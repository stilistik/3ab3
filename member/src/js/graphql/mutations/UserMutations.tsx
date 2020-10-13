import gql from 'graphql-tag';

export const EDIT_SELF = gql`
  mutation($input: EditSelfInput!) {
    editSelf(input: $input) {
      id
    }
  }
`;
