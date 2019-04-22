import React from 'react';
import { Grid } from '@material-ui/core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Questionnaire from './Questionnaire';

export const QUESTIONS = gql`
  query {
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
    if (!this.props.questions) return null;
    return (
      <div style={{ width: '100%', height: '100%', padding: '20px' }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Questionnaire questions={this.props.questions} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default graphql(QUESTIONS, {
  props: ({ data }) => ({ questions: data.questions }),
})(Steps);
