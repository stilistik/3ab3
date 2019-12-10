import React from 'react';
import { Grid } from '@material-ui/core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Questionnaire from './Questionnaire';

export const QUESTIONS = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      date
    }
    questions {
      id
      text
      description
      templates {
        id
        text
        offsetDays
      }
    }
  }
`;

class Steps extends React.Component {
  render() {
    const { questions, event } = this.props;
    if (!questions || !event) return null;
    return (
      <div style={{ width: '100%', height: '100%', padding: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Questionnaire {...this.props} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default graphql(QUESTIONS, {
  skip: (props) => !props.eventId,
  options: (props) => ({ variables: { eventId: props.eventId } }),
  props: ({ data }) => ({ questions: data.questions, event: data.event }),
})(Steps);
