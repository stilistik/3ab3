import React from 'react';
import MemberForm from '../MemberForm';
import gql from 'graphql-tag';
import { Message } from 'Components';
import { useMutation } from '@apollo/react-hooks';
import { MEMBERS } from '../list/Members';
import { requestRoute } from 'History';

const MUTATION = gql`
  mutation($userId: ID!, $input: UserInput!) {
    editUser(userId: $userId, input: $input) {
      id
    }
  }
`;

const EditMemberForm = ({ user, ...rest }) => {
  const [editUser] = useMutation(MUTATION);

  const onSubmit = async (values) => {
    try {
      await editUser({
        variables: {
          userId: user.id,
          input: values,
        },
        refetchQueries: () => {
          return [{ query: MEMBERS }];
        },
      });
    } catch (error) {
      Message.error(error.message);
      return;
    }
    Message.success('User update successful');
    requestRoute('/members');
  };

  return <MemberForm {...rest} onSubmit={onSubmit} initValues={user} />;
};

export default EditMemberForm;
