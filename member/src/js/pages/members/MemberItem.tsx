import React from 'react';
import { Link, Paper, Typography } from '@material-ui/core';
import { Tag, Box, UserAvatar } from 'Components/index';
import { UserRole, User } from 'Graphql/types';
import { DeleteMember } from './DeleteMember';
import { EditMember } from './EditMember';
import { useTranslation } from 'react-i18next';

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
}

export const MemberItem: React.FC<MemberItemProps> = ({ user }) => {
  const { t } = useTranslation();
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
            <EditMember user={user} />
            <DeleteMember user={user} />
          </Box.Row>
        </Box.Row>
        <Box pt={2} cmb={1}>
          <Typography variant="body2">
            {t('Email')}:{' '}
            <Link color="secondary" href={`mailto:${user.email}`}>
              {user.email}
            </Link>
          </Typography>
          <Typography variant="body2">
            {t('Phone')}: {user.phone || null}
          </Typography>
          <Typography variant="body2">
            {t('Birthday')}:{' '}
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
