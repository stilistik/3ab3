import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Question from './Question';

const QUESTIONS = gql`
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

class QuestionList extends React.Component {
  render() {
    const { questions } = this.props;
    if (!questions) return null;
    return (
      <div>
        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              question={question}
              refetch={[{ query: QUESTIONS }]}
            />
          );
        })}
      </div>
    );
  }
}

export default graphql(QUESTIONS, {
  props: ({ data }) => ({ questions: data.questions }),
})(QuestionList);
