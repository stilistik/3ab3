import React from 'react';
import {
  ClickAwayListener,
  Typography,
  Paper,
  Popper,
  MenuList,
  IconButton,
  Badge,
} from '@material-ui/core';
import Invitation from './Invitation';
import { Icon } from 'Components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { COMMITTEE } from 'Pages/events/edit/committee/Committee';

import styles from './Invitations.css';

export const INVITATIONS = gql`
  query {
    currentUser {
      id
      pendingInvitations {
        id
        status
        committee {
          event {
            id
            title
          }
        }
      }
    }
  }
`;

class Invitations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: null,
    };
  }

  handleMenuOpen = (e) => {
    this.setState({ anchor: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };

  render() {
    if (!this.props.user) return null;
    const pending = this.props.user.pendingInvitations;
    const { anchor } = this.state;
    const open = anchor ? true : false;
    const renderMenu = (
      <Popper
        style={{ marginTop: '15px', zIndex: 100 }}
        open={open}
        anchorEl={this.state.anchor}
      >
        {() => (
          <Paper className={styles.paper}>
            <ClickAwayListener onClickAway={this.handleClose}>
              <MenuList>
                {pending.length ? (
                  <div>
                    {pending.map((invitation) => {
                      return (
                        <Invitation
                          key={invitation.id}
                          invitation={invitation}
                          refetch={[
                            { query: INVITATIONS },
                            {
                              query: COMMITTEE,
                              variables: {
                                eventId: invitation.committee.event.id,
                              },
                            },
                          ]}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <Typography className={styles.typo}>
                    No notifications
                  </Typography>
                )}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        )}
      </Popper>
    );

    return (
      <div>
        <IconButton onClick={this.handleMenuOpen}>
          <Badge
            badgeContent={pending.length}
            classes={{ badge: styles.badge }}
          >
            <Icon type="mail" className={styles.icon} />
          </Badge>
        </IconButton>
        {renderMenu}
      </div>
    );
  }
}

export default graphql(INVITATIONS, {
  props: ({ data }) => ({ user: data.currentUser }),
})(Invitations);
