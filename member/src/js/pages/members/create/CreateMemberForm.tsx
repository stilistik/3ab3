import React from 'react';
import { MemberForm } from '../MemberForm';
import { useMutation } from '@apollo/react-hooks';
import { Message } from 'Components/index';
import { requestRoute } from 'History/index';
import { Serializable } from 'Components/form/types';
import { USER_LIST } from 'Graphql/queries';
import { CREATE_USER } from 'Graphql/mutations';

const CreateMemberForm: React.FC = (props) => {
  const [createUser] = useMutation(CREATE_USER);
  const onSubmit = async (values: NestedRecord<Serializable>) => {
    try {
      await createUser({
        variables: {
          input: values,
        },
        refetchQueries: () => {
          return [{ query: USER_LIST }];
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
