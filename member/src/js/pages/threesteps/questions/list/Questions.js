import React from 'react';
import { Grid, Box } from 'Components';
import QuestionList from './QuestionList';

const Questions = () => {
  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <QuestionList />
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};

export default Questions;
