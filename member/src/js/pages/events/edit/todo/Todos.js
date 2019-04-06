import React from 'react';
import TodoList from './TodoList';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const TODOS = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      todos {
        id
        text
        due
      }
    }
  }
`;

class Todos extends React.Component {
  render() {
    const { event } = this.props;
    if (!event) return null;
    return (
      <div style={{ width: '100%', padding: '20px' }}>
        <TodoList />
      </div>
    );
  }
}

export default graphql(TODOS, {
  skip: (props) => !props.eventId,
  options: (props) => ({ variables: { eventId: props.eventId } }),
  props: ({ data }) => ({ event: data.event }),
})(Todos);
