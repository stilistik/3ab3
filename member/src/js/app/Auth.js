import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { logout } from 'Redux/actions';

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

class Auth extends React.Component {
  render() {
    if (!this.props.isAuthenticated) return this.props.children;
    return (
      <Query query={QUERY}>
        {({ loading, error }) => {
          if (loading) return null;
          if (error) {
            this.props.logout();
            return null;
          }
          return this.props.children;
        }}
      </Query>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
