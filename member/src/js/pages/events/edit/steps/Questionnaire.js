import React from 'react';
import { Fab } from '@material-ui/core';
import Question from './Question';
import { Icon } from 'Components';

import styles from './Questionnaire.css';

class Questionnaire extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        {questions.map((question) => {
          return <Question key={question.id} question={question} />;
        })}
        <div className={styles.submit}>
          <Fab className={styles.btn} variant="extended" color="primary">
            <Icon style={{ marginRight: '5px' }} type="done" /> Submit
          </Fab>
        </div>
      </div>
    );
  }
}

export default Questionnaire;
