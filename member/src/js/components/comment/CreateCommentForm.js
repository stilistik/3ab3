import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Input } from '@material-ui/core';
import { UserAvatar } from 'Components';

import styles from './CreateCommentForm.css';

const QUERY = gql`
  query {
    currentUser {
      id
      name
      avatar
    }
  }
`;

const CreateCommentForm = (props) => {
  const [value, setValue] = React.useState('');
  const { loading, error, data } = useQuery(QUERY);

  if (loading || error) return null;

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  };

  const submit = () => {
    if (!value) return;
    props.onSubmit({
      id: props.id,
      text: value,
    });
    setValue('');
  };

  return (
    <div className={styles.container}>
      <UserAvatar user={data.currentUser} className={styles.avatar} />
      <Input
        className={styles.input}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
        multiline
        disableUnderline
        autoFocus={true}
        placeholder="Comment"
      />
    </div>
  );
};

export default CreateCommentForm;
