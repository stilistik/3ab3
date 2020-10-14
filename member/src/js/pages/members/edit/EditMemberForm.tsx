import React from 'react';
import { Message } from 'Components/index';
import { useMutation } from '@apollo/react-hooks';
import { requestRoute } from 'History/index';
import { EDIT_USER } from 'Graphql/mutations';
import { USER_LIST } from 'Graphql/queries';
import { User } from 'Graphql/types';
import { Serializable } from 'Components/form/types';
import { MemberForm } from '../MemberForm';

interface EditMemberFormProps {
  user: User;
}

export const EditMemberForm: React.FC<EditMemberFormProps> = ({ user }) => {
  const [editUser] = useMutation(EDIT_USER);

  const onSubmit = async (values: NestedRecord<Serializable>) => {
    try {
      await editUser({
        variables: {
          userId: user.id,
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
    Message.success('User update successful');
    requestRoute('/members');
  };

  return <MemberForm onSubmit={onSubmit} user={user} />;
};
