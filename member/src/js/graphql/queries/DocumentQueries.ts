import gql from 'graphql-tag';

export const DOCUMENT_LIST = gql`
  query {
    documents {
      id
      name
      thumbnail
      file {
        id
        uri
      }
    }
  }
`