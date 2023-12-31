import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import classnames from 'classnames';
import { getBackendUrl } from 'App/network/Utils';
import { User } from 'Graphql/types';

interface UserAvatarProps {
  user: User;
  classes?: UserAvatarClasses;
  className?: string;
  style?: React.CSSProperties;
}

interface UserAvatarClasses {
  avatar?: string;
  typo?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  classes = {},
  className,
  style,
}) => {
  const stringToHSL = (str: string) => {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }
    var shortened = hash % 300;
    return 'hsl(' + shortened + ',60%,60%)';
  };

  if (!user) return null;

  const avatarClass = classnames(className, classes?.avatar);

  if (user.avatar) {
    const url = getBackendUrl() + user.avatar + '@100';
    return (
      <Avatar src={url} alt="Not Found" className={avatarClass} style={style} />
    );
  } else {
    const letter = user.name.charAt(0).toUpperCase();
    const color = stringToHSL(user.name);
    return (
      <Avatar className={avatarClass} style={{ background: color, ...style }}>
        <Typography className={classes?.typo} style={{ color: 'white' }}>
          {letter}
        </Typography>
      </Avatar>
    );
  }
};