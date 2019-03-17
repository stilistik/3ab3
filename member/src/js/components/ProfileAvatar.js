import React from 'react';
import { Avatar } from '@material-ui/core';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const QUERY = gql`
  query {
    currentUser {
      name
      avatar
    }
  }
`;

class ProfileAvatar_Component extends React.Component {
  render() {
    if (!this.props.user) return null;
    if (this.props.user.avatar) {
      const url = global.API_URL + this.props.user.avatar;
      return (
        <Avatar
          src={url}
          alt="Not Found"
          style={{
            backgroundColor: '#1a77ad',
            cursor: 'pointer',
            ...this.props.style,
          }}
        />
      );
    } else {
      const letter = this.props.user.name.charAt(0).toUpperCase();
      return (
        <Avatar
          style={{
            backgroundColor: '#1a77ad',
            cursor: 'pointer',
            ...this.props.style,
          }}
        >
          {letter}
        </Avatar>
      );
    }
  }
}

export const ProfileAvatar = graphql(QUERY, {
  props: ({ data }) => ({ user: data.currentUser }),
})(ProfileAvatar_Component);
