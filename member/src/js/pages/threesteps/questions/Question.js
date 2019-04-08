import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { Icon } from 'Components';
import TodoTemplate from '../templates/TodoTemplate';

import styles from './Question.css';
import gql from 'graphql-tag';

const Todos = ({ templates }) => {
  return (
    <div className={styles.content}>
      <Typography>Todos:</Typography>
      <Divider />
      <br />
      {templates.map((template) => {
        return <TodoTemplate key={template.id} template={template} />;
      })}
    </div>
  );
};

const Description = ({ description }) => {
  return (
    <div className={styles.content}>
      <Typography>Description:</Typography>
      <Divider />
      <br />
      <Typography>{description}</Typography>
    </div>
  );
};

class Question extends React.Component {
  onDelete = () => {
    this.props.onDelete();
  };

  onEdit = () => {};

  render() {
    const { text, description, templates } = this.props.question;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon type="expand" />}>
          <Typography variant="h6" className={styles.header}>
            {text}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Description description={description} />
          <Todos templates={templates} />
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <IconButton onClick={this.onEdit}>
            <Icon type="edit" />
          </IconButton>
          <IconButton onClick={this.onDelete}>
            <Icon type="delete" />
          </IconButton>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

const MUTATION = gql`
  mutation($questionId: ID!) {
    deleteQuestion(questionId: $questionId) {
      id
    }
  }
`;

class QuestionMutation extends React.Component {
  onDelete = () => {
    this.deleteQuestion({
      variables: { questionId: this.props.question.id },
      refetchQueries: () => this.props.refetch,
    });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(deleteQuestion) => {
          this.deleteQuestion = deleteQuestion;
          return <Question {...this.props} onDelete={this.onDelete} />;
        }}
      </Mutation>
    );
  }
}

export default QuestionMutation;
