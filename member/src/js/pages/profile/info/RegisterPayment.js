import React from 'react';
import gql from 'graphql-tag';
import { Mutation, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import PaymentForm from './PaymentForm';
import { BALANCE_DISPLAY } from './BalanceDisplay';
import { BALANCE } from '../balance/Balance';

const USER = gql`
  query {
    currentUser {
      id
    }
  }
`;

const MUTATION = gql`
  mutation($input: PaymentInput!) {
    createPayment(input: $input) {
      id
    }
  }
`;

const mapDispatchToProps = (dispatch) => {
  return {
    message: (message) => {
      dispatch(showMessage(message));
    },
  };
};

class RegisterPayment extends React.Component {
  onSubmit = async (values) => {
    try {
      await this.createPayment({
        variables: {
          input: {
            userId: this.props.user.id,
            amount: parseInt(values.amount),
            date: new Date().toISOString(),
          },
        },
        refetchQueries: () => [{ query: BALANCE }, { query: BALANCE_DISPLAY }],
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
    this.props.message({
      type: 'success',
      text: 'Payment successfully registered.',
    });
  };

  render() {
    if (!this.props.user) return null;
    return (
      <Mutation mutation={MUTATION}>
        {(createPayment) => {
          this.createPayment = createPayment;
          return <PaymentForm onSubmit={this.onSubmit} />;
        }}
      </Mutation>
    );
  }
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  graphql(USER, {
    props: ({ data }) => ({ user: data.currentUser }),
  })
)(RegisterPayment);
