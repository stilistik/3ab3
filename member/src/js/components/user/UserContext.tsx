import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Loading, Message } from 'Components/index';
import { CURRENT_USER_QUERY } from 'Graphql/queries';
import { User } from 'Graphql/types';

export const UserContext = React.createContext<User | undefined>(undefined);

export const userCurrentUser = (): User => {
  const contextValue = React.useContext(UserContext);
  if (contextValue === undefined) {
    throw new Error('useCurrentUser must be used within UserContext provider.');
  }
  return contextValue;
};

export const UserProvider: React.FC = ({ children }) => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (error) return <Loading type="absolute" />;
  if (loading) return <Loading type="absolute" />;

  return (
    <UserContext.Provider value={data.currentUser}>{children}</UserContext.Provider>
  );
};