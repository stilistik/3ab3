import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const QUERY = gql`
  query {
    currentUser {
      id
      name
      avatar
    }
  }
`;

class ProfileAvatar_Component extends React.Component {
  stringToHslColor = (str, s, l) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  };

  render() {
    if (!this.props.user) return null;

    let avatar_cls, typo_cls;
    if (this.props.classes) {
      avatar_cls = this.props.classes.avatar;
      typo_cls = this.props.classes.typo;
    }

    if (this.props.user.avatar) {
      const url = global.API_URL + this.props.user.avatar;
      return (
        <Avatar
          src={url}
          alt="Not Found"
          className={avatar_cls ? avatar_cls : null}
        />
      );
    } else {
      const letter = this.props.user.name.charAt(0).toUpperCase();
      const color = this.stringToHslColor(this.props.user.name, 60, 60);
      return (
        <Avatar
          className={avatar_cls ? avatar_cls : null}
          style={{ background: color }}
        >
          <Typography className={typo_cls ? typo_cls : null}>
            {letter}
          </Typography>
        </Avatar>
      );
    }
  }
}

export const ProfileAvatar = graphql(QUERY, {
  props: ({ data }) => ({ user: data.currentUser }),
})(ProfileAvatar_Component);
