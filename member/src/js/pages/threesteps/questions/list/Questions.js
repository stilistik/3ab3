import React from 'react';
import { DefaultGrid } from 'Components';
import { Grid } from '@material-ui/core';
import QuestionList from './QuestionList';

import styles from './Questions.css';

class Questions extends React.Component {
  render() {
    return (
      <DefaultGrid>
        <div className={styles.container}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <QuestionList />
            </Grid>
          </Grid>
        </div>
      </DefaultGrid>
    );
  }
}

export default Questions;
