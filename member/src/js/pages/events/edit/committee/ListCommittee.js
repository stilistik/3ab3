import React from 'react';
import { Typography, Paper, Divider } from '@material-ui/core';
import { UserAvatar } from 'Components';

import styles from './ListCommittee.css';

class ListCommittee extends React.Component {
  render() {
    if (!this.props.committee) return null;
    const { members, creator } = this.props.committee;

    return (
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h3">Current Committee</Typography>
        <br />
        <Typography variant="h6">Creator</Typography>
        <Divider />
        <br />
        <div className={styles.item}>
          <UserAvatar user={creator} style={{ marginRight: '10px' }} />
          <Typography variant="body1">{creator.name}</Typography>
        </div>
        {members.length > 0 ? (
          <div>
            <Typography variant="h6">Members</Typography>
            <Divider />
            <br />
            {members.map((member) => {
              return (
                <div key={member.id} className={styles.item}>
                  <UserAvatar user={member} style={{ marginRight: '10px' }} />
                  <Typography variant="body1">{member.name}</Typography>
                </div>
              );
            })}
          </div>
        ) : null}
      </Paper>
    );
  }
}

export default ListCommittee;
