import React from 'react';
import { UserRole } from 'Graphql/types';
import { useCurrentUser } from 'Components/user';

export const AdminOnly: React.FC = ({ children }) => {
  const user = useCurrentUser();
  const hasAccess =
    user.role === UserRole.Admin || user.role === UserRole.Super;
  return <React.Fragment>{hasAccess ? children : null}</React.Fragment>;
};
