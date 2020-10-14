import gql from 'graphql-tag';

export const CREATE_EVENT = gql`
  mutation($input: EventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`;
