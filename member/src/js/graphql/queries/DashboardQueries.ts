import gql from 'graphql-tag';

export const USERS_WITH_DEBT = gql`
  query($threshold: Int!) {
    usersWithDebt(threshold: $threshold) {
      id
      name
      avatar
      balance
    }
  }
`;
