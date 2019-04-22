import React from 'react';
import { Dialog, IconButton, Typography } from '@material-ui/core';
import { Icon, UserListSelector, UserAvatar } from 'Components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './Assign.css';

const MUTATION = gql`
  mutation($userId: ID!, $todoId: ID!) {
    assignUser(userId: $userId, todoId: $todoId) {
      id
    }
  }
`;

class AssignDialog extends React.Component {
  onChange = async (user) => {
    await this.assignUser({
      variables: {
        userId: user.id,
        todoId: this.props.todoId,
      },
      refetchQueries: () => this.props.refetch,
    });
    this.props.onClose();
  };

  render() {
    const { open, onClose } = this.props;
    return (
      <Mutation mutation={MUTATION}>
        {(assignUser) => {
          this.assignUser = assignUser;
          return (
            <Dialog onClose={onClose} open={open}>
              <div className={styles.dialog}>
                <UserListSelector onChange={this.onChange} />
              </div>
            </Dialog>
          );
        }}
      </Mutation>
    );
  }
}

class Assign extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  onClick = () => {
    this.setState({ open: true });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { assigned } = this.props;
    return (
      <div className={styles.assigned}>
        {assigned ? (
          <div className={styles.assigned}>
            <IconButton className={styles.iconbtn} onClick={this.onClick}>
              <UserAvatar className={styles.avatar} user={assigned} />
            </IconButton>
            <Typography variant="body2">{assigned.name}</Typography>
          </div>
        ) : (
          <IconButton className={styles.iconbtn} onClick={this.onClick}>
            <Icon type="personAdd" />
          </IconButton>
        )}
        <AssignDialog
          open={this.state.open}
          onClose={this.onClose}
          {...this.props}
        />
      </div>
    );
  }
}

export default Assign;
