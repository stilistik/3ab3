import React from 'react';
import { Avatar, Typography } from '@material-ui/core';

export class UserAvatar extends React.Component {
  stringToHSL = (str) => {
    var hash = 0;
    if (this.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }
    var shortened = hash % 300;
    return 'hsl(' + shortened + ',60%,60%)';
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
      const color = this.stringToHSL(this.props.user.name);
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
