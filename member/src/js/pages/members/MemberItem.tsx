import React from 'react';
import { Paper, IconButton, Typography } from '@material-ui/core';
import { Icon, Tag, Box, UserAvatar } from 'Components/index';
import { UserRole, User } from 'Graphql/types';

const RoleColors: Record<UserRole, string> = {
  ADMIN: '#0394fc',
  SUPER: '#fc7b03',
  MEMBER: '#c4c4c4',
};

interface RoleDisplayProps {
  role: UserRole;
}

const RoleDisplay: React.FC<RoleDisplayProps> = ({ role }) => {
  if (role === 'MEMBER') return null;
  return (
    <Tag outlined color={RoleColors[role]}>
      {role}
    </Tag>
  );
};

interface MemberItemProps {
  user: User;
  onClick: (userId: string) => void;
}

export const MemberItem: React.FC<MemberItemProps> = ({ user, onClick }) => {
  const handleEdit = () => {
    onClick(user.id);
  };

  const handleDelete = () => {};

  return (
    <Paper>
      <Box p={2}>
        <Box.Row jc="space-between">
          <Box.Row cmr={1}>
            <UserAvatar user={user} />
            <Typography variant="h6">{user.name}</Typography>
            <RoleDisplay role={user.role} />
          </Box.Row>
          <Box.Row cmrnl={1}>
            <IconButton onClick={handleEdit}>
              <Icon type="edit" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <Icon type="delete" />
            </IconButton>
          </Box.Row>
        </Box.Row>
        <Box pt={2}>
          <Typography variant="body2">
            Email: <a href={`mailto:${user.email}`}>{user.email}</a>
          </Typography>
          <Typography variant="body2">Phone: {user.phone || null}</Typography>
          <Typography variant="body2">
            Birthday:{' '}
            {user.birthdate
              ? new Date(user.birthdate).toLocaleDateString()
              : null}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default MemberItem;