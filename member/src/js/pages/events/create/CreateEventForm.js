import React from 'react';
import EventForm from '../EventForm';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { EVENTS } from '../list/Events';

const MUTATION = gql`
  mutation($input: EventInput!) {
    createEvent(input: $input) {
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

class FormMutation extends React.Component {
  onSubmit = async (values) => {
    try {
      await this.createEvent({
        variables: {
          input: values,
        },
        refetchQueries: () => {
          return [{ query: EVENTS }];
        },
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
    this.props.message({ type: 'success', text: 'Event successfully created' });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(createEvent) => {
          this.createEvent = createEvent;
          return <EventForm {...this.props} onSubmit={this.onSubmit} />;
        }}
      </Mutation>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FormMutation);
