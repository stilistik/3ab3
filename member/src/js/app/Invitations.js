import React from 'react';
import {
  ClickAwayListener,
  Grow,
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

import styles from './Invitations.css';

const INVITATIONS = gql`
  query {
    currentUser {
      id
      invitations {
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
    const pending = this.props.user.invitations.filter(
      (inv) => inv.status === 'PENDING'
    );
    const { anchor } = this.state;
    const open = anchor ? true : false;
    const renderMenu = (
      <Popper
        style={{ marginTop: '15px', zIndex: 100 }}
        open={open}
        anchorEl={this.state.anchor}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              top: 0,
              right: '-15px',
              position: 'absolute',
            }}
          >
            <Paper className={styles.paper}>
              <ClickAwayListener onClickAway={this.handleClose}>
                <MenuList>
                  {pending.map((invitation) => {
                    return (
                      <Invitation
                        key={invitation.id}
                        invitation={invitation}
                        refetch={[{ query: INVITATIONS }]}
                      />
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
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
        {pending.length > 0 ? renderMenu : null}
      </div>
    );
  }
}

export default graphql(INVITATIONS, {
  props: ({ data }) => ({ user: data.currentUser }),
})(Invitations);
