import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid } from '@material-ui/core';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';

export const TODOS = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      todos {
        id
        text
        due
        done
        doneBy {
          id
          avatar
          name
        }
        assigned {
          id
          avatar
          name
        }
        doneAt
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CreateTodo
              eventId={event.id}
              refetch={[{ query: TODOS, variables: { eventId: event.id } }]}
            />
          </Grid>
          <Grid item xs={12}>
            <TodoList
              todos={event.todos}
              refetch={[{ query: TODOS, variables: { eventId: event.id } }]}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default graphql(TODOS, {
  skip: (props) => !props.eventId,
  options: (props) => ({ variables: { eventId: props.eventId } }),
  props: ({ data }) => ({ event: data.event }),
})(Todos);
