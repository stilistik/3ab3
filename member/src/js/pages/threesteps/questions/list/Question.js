import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Typography,
  Divider,
  Grid,
  IconButton,
} from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { Icon, DeleteConfirm } from 'Components';
import TodoTemplate from '../../templates/TodoTemplate';

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
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  onDelete = () => {
    this.props.onDelete();
  };

  onOpen = (e) => this.setState({ anchorEl: e.target });

  onCancel = () => this.setState({ anchorEl: null });

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
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Description description={description} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Todos templates={templates} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions className={styles.actions}>
          <IconButton onClick={this.onEdit}>
            <Icon type="edit" />
          </IconButton>
          <IconButton onClick={this.onOpen}>
            <Icon type="delete" />
          </IconButton>
          <DeleteConfirm
            anchorEl={this.state.anchorEl}
            onDelete={this.onDelete}
            onCancel={this.onCancel}
          />
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
