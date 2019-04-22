import React from 'react';
import {
  Checkbox,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { Icon } from 'Components';

import styles from './Question.css';

class Question extends React.Component {
  onCheck = (e) => {
    e.stopPropagation();
  };

  render() {
    const { text, description } = this.props.question;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon type="expand" />}>
          <div className={styles.question}>
            <Checkbox onClick={this.onCheck} />
            <Typography variant="h6" className={styles.header}>
              {text}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{description}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Question;
