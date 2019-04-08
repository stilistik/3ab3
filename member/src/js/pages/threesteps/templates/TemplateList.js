import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import TodoTemplate from './TodoTemplate';

import styles from './TemplateList.css';

export const TEMPLATES = gql`
  query {
    todoTemplates {
      id
      text
      offsetDays
    }
  }
`;

class TemplateList extends React.Component {
  render() {
    const { templates } = this.props;
    if (!templates) return null;
    return (
      <Paper className={styles.paper}>
        <Typography variant="h3" className={styles.typo}>
          Current Todo Templates
        </Typography>
        {templates.map((template) => {
          return <TodoTemplate key={template.id} template={template} />;
        })}
      </Paper>
    );
  }
}

export default graphql(TEMPLATES, {
  props: ({ data }) => ({ templates: data.todoTemplates }),
})(TemplateList);
