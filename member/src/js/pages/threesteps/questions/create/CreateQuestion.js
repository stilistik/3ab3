import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import CreateQuestionForm from './CreateQuestionForm';
import { QUESTIONS } from '../list/QuestionList';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';

const MUTATION = gql`
  mutation($input: QuestionInput!) {
    createQuestion(input: $input) {
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

class CreateQuestion extends React.Component {
  onSubmit = async (values) => {
    try {
      await this.createQuestion({
        variables: { input: values },
        refetchQueries: () => [{ query: QUESTIONS }],
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
    this.props.message({
      type: 'success',
      text: 'Questions successfully created',
    });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(createQuestion) => {
          this.createQuestion = createQuestion;
          return <CreateQuestionForm onSubmit={this.onSubmit} />;
        }}
      </Mutation>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateQuestion);
