import React from 'react';

export const LayoutContext = React.createContext<LayoutContextValue | undefined>(undefined);

export interface LayoutContextValue {
  boxesPerRow: number;
  boxSize: number;
  margin: number;
}

export const useLayout = (): LayoutContextValue => {
  const contextValue = React.useContext(LayoutContext);
  if (contextValue === undefined) throw new Error('useLayout has to be used inside a LayoutProvider component.');
  return contextValue;
};

export function withLayout(WrappedComponent: React.ElementType): React.ReactNode {
  return class LayoutConsumer extends React.Component {
    render() {
      return (
        <LayoutContext.Consumer>
          {(value) => {
            if (!value) return null;
            return <WrappedComponent {...this.props} layout={value} />;
          }}
        </LayoutContext.Consumer>
      );
    }
  };
}
