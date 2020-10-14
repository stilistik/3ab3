import React from 'react';

/**************************************/
const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
interface SetIsAuthenticatedAction {
  type: typeof SET_IS_AUTHENTICATED;
  isAuthenticated: boolean;
}

export const setIsAuthenticated = (
  isAuthenticated: boolean
): SetIsAuthenticatedAction => {
  return { type: SET_IS_AUTHENTICATED, isAuthenticated };
};

type StoreAction = SetIsAuthenticatedAction;

interface Store {
  isAuthenticated: boolean;
}

const initState: Store = {
  isAuthenticated: false,
};

interface StoreContextValue {
  state: Store;
  dispatch: React.Dispatch<StoreAction>;
}

const StoreContext = React.createContext<StoreContextValue | undefined>(
  undefined
);

export const useStore = (): StoreContextValue => {
  const contextValue = React.useContext(StoreContext);

  if (contextValue === undefined) {
    throw new Error('useStore must be used withing Store provider.');
  }

  return contextValue;
};

const reducer = (state: Store, action: StoreAction): Store => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED: {
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
      });
    }
    default:
      throw new Error(`Store: Unsupported action type ${action.type}`);
  }
};

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
