import React from 'react';

const FieldScopeContext = React.createContext<string | undefined>(undefined);

export const useFieldScope = (): string | undefined => React.useContext(FieldScopeContext);

interface FieldScopeProps {
  id: string;
}

export const FieldScope: React.FC<FieldScopeProps> = ({ id, children }) => {
  return <FieldScopeContext.Provider value={id}>{children}</FieldScopeContext.Provider>;
};
