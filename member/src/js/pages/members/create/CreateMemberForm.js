import React from 'react';
import MemberForm from '../MemberForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { MEMBERS } from '../list/Members';
import { Message } from 'Components';
import { requestRoute } from 'History';

const MUTATION = gql`
  mutation($input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

const CreateMemberForm = (props) => {
  const [createUser] = useMutation(MUTATION);
  const onSubmit = async (values) => {
    try {
      await createUser({
        variables: {
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
    Message.success('User successfully created');
    requestRoute('/members');
  };

  return <MemberForm {...props} onSubmit={onSubmit} />;
};

export default CreateMemberForm;
