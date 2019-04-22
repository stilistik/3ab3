import React from 'react';
import { Fab } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Icon } from 'Components';
import Question from './Question';
import { TODOS } from '../todo/Todos';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';

import styles from './Questionnaire.css';

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.generateState(props.questions);
  }

  generateState = (questions) => {
    let state = {};
    for (let question of questions) {
      state[question.id] = false;
    }
    return state;
  };

  onChange = (id) => {
    const value = this.state[id];
    this.setState({
      [id]: !value,
    });
  };

  onSubmit = () => {
    const checkedIds = Object.keys(this.state).filter((id) => {
      return this.state[id] && true;
    });
    const { questions } = this.props;
    const checkedQuestions = questions.filter((question) => {
      return checkedIds.indexOf(question.id) >= 0;
    });
    const todos = [];
    for (let question of checkedQuestions) {
      for (let template of question.templates)
        if (!todos.find((todo) => todo.id === template.id))
          todos.push(template);
    }
    this.props.onSubmit(todos);
  };

  render() {
    const { questions } = this.props;
    return (
      <div>
        {questions.map((question) => {
          const value = this.state[question.id];
          return (
            <Question
              key={question.id}
              question={question}
              value={value}
              onChange={this.onChange}
            />
          );
        })}
        <div className={styles.submit}>
          <Fab
            className={styles.btn}
            variant="extended"
            color="primary"
            onClick={this.onSubmit}
          >
            <Icon style={{ marginRight: '5px' }} type="done" /> Submit
          </Fab>
        </div>
      </div>
    );
  }
}

const MUTATION = gql`
  mutation($input: [TodoInput!]!) {
    createManyTodos(input: $input) {
      id
    }
  }
`;

const mapDispatchToProps = (dispatch) => {
  return {
    message: (message) => {
      dispatch(showMessage(message));
    },
  };
};

class QuestionnaireMutation extends React.Component {
  onSubmit = async (todos) => {
    const { event } = this.props;
    const eventDate = new Date(event.date);
    const input = todos.map((todo) => {
      const due = new Date(eventDate);
      due.setDate(due.getDate() - todo.offsetDays);
      return {
        text: todo.text,
        eventId: this.props.eventId,
        due: due.toISOString(),
      };
    });
    try {
      await this.createManyTodos({
        variables: { input: input },
        refetchQueries: () => [
          { query: TODOS, variables: { eventId: event.id } },
        ],
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
    this.props.message({
      type: 'success',
      text: 'Steps successfully completed.',
    });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(createManyTodos) => {
          this.createManyTodos = createManyTodos;
          return <Questionnaire onSubmit={this.onSubmit} {...this.props} />;
        }}
      </Mutation>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(QuestionnaireMutation);
