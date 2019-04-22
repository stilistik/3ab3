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
  render() {
    const { text, description, id } = this.props.question;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon type="expand" />}>
          <div className={styles.question}>
            <Checkbox
              onClick={(e) => e.stopPropagation()}
              onChange={() => this.props.onChange(id)}
            />
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
