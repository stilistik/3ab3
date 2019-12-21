import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { logout } from 'Redux/actions';
import { useInterval } from 'Utils';

const QUERY = gql`
  query {
    currentUser {
      id
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

const Logout = ({ children, logout }) => {
  React.useEffect(() => {
    logout();
  }, []);
  return children;
};

const Auth = ({ children, ...rest }) => {
  const [errorCount, setErrorCount] = React.useState(0);
  const { refetch } = useQuery(QUERY);

  useInterval(() => {
    refetch()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setErrorCount(errorCount + 1);
      });
  }, 1000);

  if (errorCount > 5) return <Logout {...rest}>{children}</Logout>;

  return children;
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
