import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import CreateTemplateForm from './CreateTemplateForm';
import { TEMPLATES } from './TemplateList';

const MUTATION = gql`
  mutation($text: String!, $offsetDays: Int!) {
    createTodoTemplate(text: $text, offsetDays: $offsetDays) {
      id
    }
  }
`;

class CreateTemplate extends React.Component {
  onSubmit = (values) => {
    this.createTodoTemplate({
      variables: values,
      refetchQueries: () => [{ query: TEMPLATES }],
    });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(createTodoTemplate) => {
          this.createTodoTemplate = createTodoTemplate;
          return <CreateTemplateForm onSubmit={this.onSubmit} />;
        }}
      </Mutation>
    );
  }
}

export default CreateTemplate;
